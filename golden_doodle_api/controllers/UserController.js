var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var hasher = require('../utils/hasher');
var mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../models/User');

// RETURNS ALL ITEMS IN DATABASE
router.post('/all', function (req,res) {
    /*
        filters:[]
    */
    var sortingOrder = req.body.order == 'asc' ? 1 : -1; 
    User.aggregate( [
        
    { "$unwind": "$stocks" },
    // Do the lookup matching

     {$lookup:
     {
       from: 'stocks',
       localField: "stocks",
       foreignField: "_id",
       as: "stockObjects"
     }
    },
    // Unwind the result arrays ( likely one or none )
    { "$unwind": "$stockObjects" },
    { "$group": {
        "_id": "$_id",
        "name": { "$first": "$name"},
        //"stocks": { "$push": "$stocks" },
        "stocks": { "$push": "$stockObjects" }
    }},
       { $group: { _id: null, totalRows: { $sum: 1 } } },
       { $project: { _id: 0 } },
       //{$unwind:"$totalRows"},
    ] ).exec(function(err, counter){

    var totalRows = counter.length > 0 && counter[0].totalRows ? counter[0].totalRows : 0;

     User.aggregate(
            [
    { "$unwind": "$stocks" },
    // Do the lookup matching

     {$lookup:
     {
       from: 'stocks',
       localField: "stocks",
       foreignField: "_id",
       as: "stockObjects"
     }
    },
    // Unwind the result arrays ( likely one or none )
    { "$unwind": "$stockObjects" },
    // Group back to arrays
    { "$group": {
        "_id": "$_id",
        "name": { "$first": "$name"},
        //"stocks": { "$push": "$stocks" },
        "stocks": { "$push": "$stockObjects" }
    }},
               
                {$project:
                    {
                        "name":1,
                      
                        "stocks":1,
                        //"stockObjects":1,
                      
                    }
                },
               
                {$sort: {[req.body.orderBy]: sortingOrder}},
                {$skip :(req.body.page) * req.body.rowsPerPage},  
                {$limit:req.body.rowsPerPage},  
                
                
            ]
        )
        .exec(function(err, docs){
            console.log(err);
            if (err) return res.status(500).send({ "message": "There was a problem finding the items."});

            if(docs){

                res.status(200).send(
                    {  
                        data:docs,
                        order:req.body.order,
                        page:req.body.page,
                        rowsPerPage:req.body.rowsPerPage,
                        totalRows:totalRows

                    }
                );
            }
        });
    });

});

// CREATES A NEW USER
router.post('/', function (req, res) {
    console.log(req.body);
    User.create({
            name : req.body.name,
            email : req.body.email,
            password:hasher.createHash(req.body.password),
            stocks:mongoose.Types.ObjectId(req.body.stocks)
        },                                                 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {

    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send();
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    console.log(req.body);
    console.log("ID",req.params.id);
    User.findByIdAndUpdate(req.params.id, 
        {
            name : req.body.name,
            email : req.body.email,
            password:hasher.createHash(req.body.password),
            stocks:mongoose.Types.ObjectId(req.body.stocks)
        }, 
        {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

module.exports = router;
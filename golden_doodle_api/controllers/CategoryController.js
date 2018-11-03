var express = require('express'),
router = express.Router(),
bodyParser = require('body-parser'),
Stock = require('../models/Stock'),
Category = require('../models/Category'),
Item = require('../models/Item');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// RETURNS ALL CATEGORIES IN DATABASE
router.post('/all', function (req, res) {
    
    var sortingOrder = req.body.order == 'asc' ? 1 : -1; 
    
    Category.aggregate( [

        {
            $match:
            {
                "stock._id":{$in:req.decoded.stocks}
            }
        },
       { $group: { _id: null, totalRows: { $sum: 1 } } },
       { $project: { _id: 0 } },
       
    ] ).exec(function(err, counter){

        var totalRows = counter.length > 0 && counter[0].totalRows ? counter[0].totalRows : 0;
        Category.aggregate(
            [

                {$match:
                    {
                        "stock._id":{$in:req.decoded.stocks},
                        
                    }
                },
                
                {$project:
                    {
                        "name":1,
                        "stock":1
                        
                    }
                },
               
                {$sort: {[req.body.orderBy]: sortingOrder}},
                {$skip :(req.body.page) * req.body.rowsPerPage},  
                {$limit:req.body.rowsPerPage},
                 
                
            ]
        )
        .exec(function(err, docs){
            
            if (err) return res.status(500).send({ "message": "There was a problem finding the category."});

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

// CREATES A NEW CATEGORY
router.post('/', function (req, res) {
    console.log(req.body);
     //Stock.findById(req.body.stocks, function (err, stock) {
     Stock.findById(req.decoded.stocks, function (err, stock) {
        
        if (err) return res.status(500).send("There was a problem finding the stock.");
        if (!stock) return res.status(404).send("No stock found.");
        
        Category.create({
            name:req.body.name,
            stock,

        }, function (err, category) {
                console.log(err);
                if (err) return res.status(500).send("There was a problem adding the information to the database.");
                res.status(200).send(category);
        });

    });

});
// GETS A CATEGORY FROM THE DATABASE
router.get('/:id', function (req, res) {
    Category.findById(req.params.id, function (err, category) {
        if (err) return res.status(500).send("There was a problem finding the category.");
        if (!category) return res.status(404).send("No category found.");
        res.status(200).send(category);
    });
});

// DELETES A CATEGORY FROM THE DATABASE
router.delete('/:id', function (req, res) {

    Category.findByIdAndRemove(req.params.id, function (err, item) {
        if (err) return res.status(500).send("There was a problem deleting the item.");
        res.status(200).send(item);
    });
});

// UPDATES A SINGLE CATEGORY IN THE DATABASE
router.put('/:id', function (req, res) {

     Stock.findById(req.body.stocks, function (err, stock) {
        
        if (err) return res.status(500).send("There was a problem finding the stock.");
        if (!stock) return res.status(404).send("No stock found.");
        
        Category.findByIdAndUpdate(req.params.id, {
            name:req.body.name,
            stock
        }, function (err, category) {
            console.log(err);
            if (err) return res.status(500).send("There was a problem updating the category.");
            res.status(200).send(category);
        });

    });

    
});

module.exports = router;
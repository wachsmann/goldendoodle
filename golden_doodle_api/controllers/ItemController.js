var express = require('express'),
router = express.Router(),
bodyParser = require('body-parser'),
Item = require('../models/Item');
ItemStory = require('../models/ItemStory');
var mongoose = require('mongoose');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());




// RETURNS ALL ITEMS IN DATABASE
router.post('/all', function (req,res) {
    /*
        filters:[]
    */
    var sortingOrder = req.body.order == 'asc' ? 1 : -1; 
    Item.aggregate( [
        {
            $lookup:
            {
                from: 'categories',
                localField: "category",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $match:
            {
                "category.stock._id":{$in:req.decoded.stocks},
        
            }
        },
       { $group: { _id: null, totalRows: { $sum: 1 } } },
       { $project: { _id: 0 } },
       //{$unwind:"$totalRows"},
    ] ).exec(function(err, counter){

        
        var totalRows = counter.length > 0 && counter[0].totalRows ? counter[0].totalRows : 0;
        Item.aggregate(
            [
 
                /*{$match:
                    {
                        "passengers._id":req.params.passenger,
                        //"started_at" : {$gte:dateNow}, 
                    }
                },*/
                {$lookup:
                 {
                   from: 'categories',
                   localField: "category",
                   foreignField: "_id",
                   as: "category"
                 }
                },
                {$lookup:
                    {
                       from: 'unity_measures',
                       localField: "unity_measure",
                       foreignField: "_id",
                       as: "unity_measure"
                    },
                },
                {$match:
                    {
                        "category.stock._id":{$in:req.decoded.stocks},
                        //"started_at" : {$gte:dateNow}, 
                    }
                },
                
                {$project:
                    {
                        "name":1,
                        "qtt":1,
                        "category":{ "$arrayElemAt": [ "$category", 0 ] },
                        "unity_measure":{ "$arrayElemAt": [ "$unity_measure", 0 ] },
                        
                    }
                },
               
                {$sort: {[req.body.orderBy]: sortingOrder}},
                {$skip :(req.body.page) * req.body.rowsPerPage},  
                {$limit:req.body.rowsPerPage},
                 
                
            ]
        )
        .exec(function(err, docs){
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

// CREATES A NEW ITEM
router.post('/', function (req, res) {
    
    if(req.body.categories == -1  || req.body.unities == -1)
        return res.status(500).send("There was a problem adding the information to the database.");
    let category_id = mongoose.Types.ObjectId(req.body.categories);
    let unity_id = mongoose.Types.ObjectId(req.body.unities);
    
   
    Item.create({
            name : req.body.name,
            qtt : req.body.qtt,
            category:category_id,
            unity_measure:unity_id
        }, 
        function (err, item) {
            console.log(err);
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            console.log(item);  
            ItemStory.create(
                {
                    name : item.name,
                    qtt : item.qtt,
                    category:item.category,
                    unity_measure:item.unity_measure,
                    id_item:item._id,
                    user:{_id:req.decoded._id,name:req.decoded.name}
                });
            
            res.status(200).send(item);
        });
});
// GETS A ITEM USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    Item.findById(req.params.id, function (err, item) {
        if (err) return res.status(500).send("There was a problem finding the item.");
        if (!item) return res.status(404).send("No item found.");
        res.status(200).send(item);
    });
});

// DELETES A ITEM FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Item.findByIdAndRemove(req.params.id, function (err, item) {
        if (err) return res.status(500).send("There was a problem deleting the item.");
        res.status(200).send(item);
    });
});

// UPDATES A SINGLE ITEM IN THE DATABASE
router.put('/:id', function (req, res) {
    console.log(req.body);
    Item.findByIdAndUpdate(req.params.id, req.body, function (err, item) {
        console.log(err);
        if (err) return res.status(500).send("There was a problem updating the item.");
        ItemStory.create(
        {
            name : req.body.name,
            qtt : req.body.qtt,
            category:req.body.category,
            unity_measure:req.body.unity_measure,
            id_item:req.params.id,
            user:{_id:req.decoded.id,name:req.decoded.name}
        });
        res.status(200).send(item);
    });
});

module.exports = router;
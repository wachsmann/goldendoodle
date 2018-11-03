var express = require('express'),
router = express.Router(),
bodyParser = require('body-parser'),
Stock = require('../models/Stock');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// RETURNS ALL STOCKS IN DATABASE
router.post('/all', function (req, res) {
  
    var sortingOrder = req.body.order == 'asc' ? 1 : -1; 
    Stock.aggregate( [
       { $group: { _id: null, totalRows: { $sum: 1 } } },
       { $project: { _id: 0 } },
    ] ).exec(function(err, counter){

        var totalRows = counter.length > 0 && counter[0].totalRows ? counter[0].totalRows : 0;
        Stock.aggregate(
            [
                {$project:
                    {
                        "name":1,
                        
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

// CREATES A NEW stock
router.post('/', function (req, res) {
    Stock.create(req.body, 
        function (err, stock) {
            console.log(err);
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(stock);
        });
});
// GETS A stock FROM THE DATABASE
router.get('/:id', function (req, res) {
    Stock.findById(req.params.id, function (err, stock) {
        if (err) return res.status(500).send("There was a problem finding the stock.");
        if (!stock) return res.status(404).send("No stock found.");
        res.status(200).send(stock);
    });
});

// DELETES A stock FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Stock.findByIdAndRemove(req.params.id, function (err, stock) {
        console.log(stock);
        if (err || !stock) return res.status(500).send("There was a problem deleting the stock.");

        res.status(200).send(stock);
    });
});

// UPDATES A SINGLE stock IN THE DATABASE
router.put('/:id', function (req, res) {
    Stock.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, stock) {
        console.log(err);
        if (err) return res.status(500).send("There was a problem updating the stock.");
        res.status(200).send(stock);
    });
});

module.exports = router;
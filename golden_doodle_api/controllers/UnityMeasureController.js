var express = require('express'),
router = express.Router(),
bodyParser = require('body-parser'),
Unity = require('../models/UnityMeasure');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// RETURNS ALL unities IN DATABASE
router.post('/all', function (req, res) {
    var sortingOrder = req.body.order == 'asc' ? 1 : -1; 
    Unity.aggregate( [
       { $group: { _id: null, totalRows: { $sum: 1 } } },
       { $project: { _id: 0 } },
    ] ).exec(function(err, counter){

        var totalRows = counter.length > 0 && counter[0].totalRows ? counter[0].totalRows : 0;
        Unity.aggregate(
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
            if (err) return res.status(500).send({ "message": "There was a problem finding the unities."});

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

// CREATES A NEW unity
router.post('/', function (req, res) {
    Unity.create(req.body, 
        function (err, unity) {
            console.log(err);
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(unity);
        });
});
// GETS A unity FROM THE DATABASE
router.get('/:id', function (req, res) {
    Unity.findById(req.params.id, function (err, unity) {
        if (err) return res.status(500).send("There was a problem finding the unity.");
        if (!unity) return res.status(404).send("No unity found.");
        res.status(200).send(unity);
    });
});

// DELETES A unity FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Unity.findByIdAndRemove(req.params.id, function (err, unity) {
        console.log(unity);
        if (err) return res.status(500).send("There was a problem deleting the unity.");

        res.status(200).send(unity);
    });
});

// UPDATES A SINGLE unity IN THE DATABASE
router.put('/:id', function (req, res) {
    Unity.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, unity) {
        console.log(err);
        if (err) return res.status(500).send("There was a problem updating the unity.");
        res.status(200).send(unity);
    });
});

module.exports = router;
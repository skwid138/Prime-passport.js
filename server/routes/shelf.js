var router = require('express').Router();
var User = require('../models/userModel');

// updates user records with items as they're added
router.put('/', function(req, res) {
    console.log('in update shelf route');
    console.log('self update req.body', req.body);
    console.log('req.user is', req.user);

    // current user's 
    
    // var userId = {
    //     id: req.user._id
    // };

    // item user is adding
    var itemToUpdate = {
        name: req.body.itemName,
        description: req.body.itemDescription,
        image: req.body.imageUrl
    };
    var db = 'canopus-passport';
    // query to add item
    var query = "{ _id: userId.id }, {$push: {item: itemToUpdate}},{ upsert: true }"; // end query
    
    // update users item
    User.update(query, function(err, resp) {
        if(err) {
            console.log('update error', err);
            res.sendStatus(500);
        } else {
            console.log('new Item created!', resp);
            res.sendStatus(201);
        }
    }); // end query
}); // router update

router.get('/', function(req, res){
    console.log('router get');
    User.find({item:{$exists: true}}, function(err, obj){


        if(err) {
            console.log('error ->', err);
            res.sendStatus(500);
        } else {
            console.log('user find results ->', obj);
            res.send(obj);
        }
    });
});

// export
module.exports = router;
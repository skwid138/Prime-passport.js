var router = require('express').Router();
var User = require('../models/userModel');

// updates user records with items as they're added
router.put('/', function(req, res) {
    console.log('in update shelf route');
    console.log('self update req.body', req.body)
    console.log('req.user is', req.user);

    // current user's id
    var userId = {
        _id: req.user._id
    };

    // item user is adding
    var itemToUpdate = new shelfSchema ({
        name: req.body.itemName,
        description: req.body.itemDescription,
        image: req.body.imageUrl
    });

    // query to add item
    var query = db.getCollection('users').updateOne(
            { _id: userId }
            // {$push: itemToUpdate},
            // { upsert: true }
    ); // end query


    // update users item
    // User.update(query, itemToUpdate, function(err, resp) {
    //     if(err) {
    //         console.log('update error', err);
    //         res.sendStatus(500);
    //     } else {
    //         console.log('new Item created!');
    //         res.sendStatus(201);

    User.findOne(userId, function(err, response){
        response.items = itemToUpdate;
        response.save();
    });

            //do the update here
        // } // end else
    // }) // end update    
}); // end router update

// export
module.exports = router;
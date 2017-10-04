var router = require('express').Router();
var User = require('../models/userModel');

// route to register/create a new user
router.post('/', function (req, res) {
    console.log('in create user route', req.body);

    var newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    newUser.save(function(err, resp) {
        if(err){
            console.log(err);
            res.sendStatus(500);
        }else{
            console.log('new user created');
            res.sendStatus(201);
        }        
    });

});

module.exports = router;
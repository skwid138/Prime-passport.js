var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var User = require('../models/userModel');

passport.serializeUser(function (user, done) {
    console.log('in serializeUser', user);
    done(null, user.id);
});

passport.use('local', new Strategy({
    passReqToCallback: true,
    // usernameField defines the field in the database that is key to password
    usernameField: 'username'
}, function (req, username, password, done) {
    console.log('inside strategy callback');

    // field:value
    User.findOne({ username: username }, function (err, user) {
        if (!user) {
            console.log('username does not exist in the db');
            done(null, false, { message: 'Incorrect credentials!' })
        } else {
            // if password from request matches
            // password from database, authenticate!
            if (password === user.password) {
                done(null, user);
            } else {
                console.log('incorrect password');
                done(null, false, { message: 'Incorrect credentials!' })                
            }
        }
    });
}));

module.exports = passport;

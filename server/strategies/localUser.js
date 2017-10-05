var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var User = require('../models/userModel');

// init request, dehydrate user for cookie/session
passport.serializeUser(function (user, done) {
    console.log('in serializeUser', user);
    done(null, user.id);
});

// taking the session token and turing back into a user on the req
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            done(err);
        }

        console.log('------------------------------- dserialized: ', user.id);
        done(null, user);
    });
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
            user.comparePassword(password, function (err, isMatched) {
                if (err) {
                    // throw err;
                    done(err);
                }

                if (isMatched) {
                    console.log('valid password');
                    
                    done(null, user);
                } else {
                    console.log('invailid password');
                    done(null, false, { message: 'Incorrect credentials!' })
                }
            });
        }
    });
}));

module.exports = passport;

var passport = require('passport');
var Strategy = require('passport-local').Strategy;


passport.use('local', new Strategy({
    passReqToCallback: true,
    // usernameField defines the field in the database that is key to password
    usernameField: 'username'
}, function (req, username, password, done) {
    console.log('inside strategy callback', req);

    // always fail
    done(null, false, { message: 'always failing!' })

}));

module.exports = passport;

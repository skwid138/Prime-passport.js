var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var SALT_WORK_FACTOR = 12;

var shelfSchema = new Schema({
    name: String,
    description: String,
    image: String
}); //end Schema

var UserSchema = new Schema({
    username: { type: String, require: true, index: { unique: true } },
    password: { type: String, require: true },
    items: shelfSchema
});

UserSchema.pre('save', function (next) {

    // this is going to be the user we are about to save
    var user = this;

    if (!user.isModified('password')) {
        next();
    }

    // genSalt takes salt rounds, defaults to ten
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            next();
        }
        // takes the field we want to hash
        bcrypt.hash(user.password, salt,  function(err, hash) {
            if (err) {
                next();
            }
            // if we logged user.password here
            user.password = hash;
            next();
        });
    });
});

// candidatePassword is password entered by user trying to login
UserSchema.methods.comparePassword = function(candidatePassword, callback) {

    // this is the current user object
    var user = this;

    bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
        
        if (err) {
            callback(err);
        }
        
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
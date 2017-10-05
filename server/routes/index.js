var router = require('express').Router();
var passport = require('passport');


/**
 * If authentication is successful send 200
 * If authentication is not successful send 401
 */
router.post('/', passport.authenticate('local'), function(req, res) {
    console.log('in post /');
    res.sendStatus(200);
});

module.exports = router;
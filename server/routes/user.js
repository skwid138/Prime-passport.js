var router = require('express').Router();

router.get('/', function (req, res) {

    // if session is valid return true and username
    if (req.isAuthenticated()) {

        res.status(200).send(
            {
                isAuth: true,
                username: req.user.username
            }
        );
    } else {
        // otherwise send 401 and authed false
        res.status(401).send({ isAuth: false });
    }

});

router.get('/logout', function(req, res) {
   req.logout();
   res.sendStatus(200);
});

module.exports = router;
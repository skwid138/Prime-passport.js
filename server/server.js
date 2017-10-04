var express = require('express');
require('./modules/db'); // require db module to connect to the database
var bodyParser = require('body-parser');

var passport = require('./strategies/localUser');

// require routers
var registerRouter = require('./routes/register.js');
var indexRouter = require('./routes/index.js');

var app = express();
var port = 3000;

// initialize passport 
app.use(passport.initialize());

app.use(express.static('server/public'));
app.use(bodyParser.json());


app.use('/register', registerRouter);
app.use('/', indexRouter);

app.listen(port, function() {
    console.log('listening on port', port);
});
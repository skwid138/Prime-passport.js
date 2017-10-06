var express = require('express');
require('./modules/db'); // require db module to connect to the database
var bodyParser = require('body-parser');
var session = require('express-session');
require('dotenv').config();

var passport = require('./strategies/localUser');

// require routers
var registerRouter = require('./routes/register');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var shelfRouter = require('./routes/shelf');

var app = express();
var port = process.env.PORT;

app.use(session({
    secret: 'any random string',
    key: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: {maxage: 60000, secure: false}
}));

// initialize passport 
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('server/public'));
app.use(bodyParser.json());

// use routes
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/', indexRouter);
app.use('/shelf', shelfRouter);

// listening
app.listen(port, function() {
    console.log('listening on satan\'s port-hole', port);
});
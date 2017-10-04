var express = require('express');
require('./modules/db'); // require db module to connect to the database
var registerRouter = require('./routes/register.js');
var bodyParser = require('body-parser');

var app = express();
var port = 3000;

app.use(express.static('server/public'));
app.use(bodyParser.json());

app.use('/register', registerRouter);

app.listen(port, function() {
    console.log('listening on port', port);
});
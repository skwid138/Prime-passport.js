var express = require('express');
require('./modules/db'); // require db module to connect to the database


var app = express();
var port = 3000;

app.use(express.static('server/public'));

app.listen(port, function() {
    console.log('listening on port', port);
});
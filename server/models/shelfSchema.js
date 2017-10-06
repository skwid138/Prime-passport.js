var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shelfSchema = new Schema({
    name: String,
    owner: String
    // image: String
}); //end Schema

var Shelf = mongoose.model('', );
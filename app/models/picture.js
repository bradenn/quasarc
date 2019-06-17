var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pictureSchema = new Schema({
    picture: String
});

module.exports = mongoose.model('Picture', pictureSchema);

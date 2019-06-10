var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var TextSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  post: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  section: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  comments: [{
    body: String,
    user: String
  }],
  user: {
    type: String,
    required: true,
  },
  nsfw: Boolean,
  date: {
    type: String,
    required: true,
  }
});

var Text = mongoose.model('Text', TextSchema);
module.exports = Text;

var mongoose = require('mongoose');

var LikeSchema = new mongoose.Schema({
  user: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  post: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  score: {
    type: Number,
    required: true
  }
});

var Like = mongoose.model('Like', LikeSchema);
module.exports = Like;

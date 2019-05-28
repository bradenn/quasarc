var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  author: String,
  body: String,
  parent: String,
  post: String
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var TextSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  media: String,
  post: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  realm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Realm'
  },
  post_type: {
    type: String,
    enum: ['text', 'media'],
    default: 'text'
  },
  nsfw: Boolean,
  date: {
    type: String,
    required: true,
  }
});
TextSchema.index({
  text: "text"
}, {
  background: true
});
var CommentSchema = new mongoose.Schema({
  author: String,
  body: String,
  date: String
});
TextSchema.plugin(require('mongoose-autopopulate'));

var Text = mongoose.model('Text', TextSchema);
var Comment = mongoose.model('Comment', CommentSchema);
module.exports = {
  Text: Text,
  Comment: Comment
};

var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  message: String,
  from: String,
  channel: Schema.ObjectId
});

var ChatMessage = mongoose.model('ChatMessage', ChatSchema);
module.exports = ChatMessage;

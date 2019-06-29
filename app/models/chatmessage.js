var mongoose = require('mongoose');

var ChatMessageSchema = new mongoose.Schema({
  message: String,
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId
  }
});

var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);
module.exports = ChatMessage;

var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  }]
});
ChatSchema.plugin(require('mongoose-autopopulate'));
var Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;

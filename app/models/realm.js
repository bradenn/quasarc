var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var RealmSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  bio: String,
  nsfw: Boolean,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  moderator: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  picture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Picture'
  }
});

var Realm = mongoose.model('Realm', RealmSchema);
module.exports = Realm;

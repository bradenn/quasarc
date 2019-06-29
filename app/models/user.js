var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const crypto = require('crypto');
var env = require("../config/env.json");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  firstname: String,
  lastname: String,
  badge: [String],
  bio: String,
  realms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Realm',
    autopopulate: true
  }],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  }],
  owned_realms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Realm'
  }],
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  picture: String,
  code: String,
  friends: [String],
  nsfw: Boolean,
  verified: Boolean
});

//authenticate input against database
UserSchema.statics.authenticate = function(username, password, callback) {
  User.findOne({
      username: username
    })
    .exec(function(err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      if (verifyHash(password, user.password)) {
        return callback(null, user);
      } else {
        callback();
      }
    });
}
//hashing a password before saving it to the database
UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  user.password = hashPassword(user.password);
  next();
});
UserSchema.plugin(require('mongoose-autopopulate'));

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
  return [salt, hash].join('$');
}

function verifyHash(password, original) {
  const originalHash = original.split('$')[1];
  const salt = original.split('$')[0];
  const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');

  return hash === originalHash

}

var User = mongoose.model('User', UserSchema);
module.exports = User;

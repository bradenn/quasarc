var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  badge: [String],
  bio: String,
  realms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Realm'
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
  picture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Picture'
  },
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
      bcrypt.compare(password, user.password, function(err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.genSalt(10, function(err, salt) {
    user.password = bcrypt.hashSync(user.password, salt);
    next();
  });

});


var User = mongoose.model('User', UserSchema);
module.exports = User;

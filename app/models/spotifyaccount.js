var mongoose = require('mongoose');

var SpotifyAccountSchema = new mongoose.Schema({
  access_token: String,
  refresh_token: String
});

var SpotifyAccount = mongoose.model('SpotifyAccount', SpotifyAccountSchema);
module.exports = SpotifyAccount;

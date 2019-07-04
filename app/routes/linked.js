var router = require('express').Router();
var User = require('../models/user');
var Account = require('../models/spotifyaccount');

// GET route for reading data
router.get('/sp/:access_token/:refresh_token', function(req, res, next) {
  var postData = {
    access_token: req.params.access_token,
    refresh_token: req.params.refresh_token
  }
  Account.create(postData, function(error, account) {
    if (error) {

    } else {
      User.findByIdAndUpdate(req.session.userId, {
        $push: {
          spotify_account: account._id
        }
      }, function(err, eh) {
        if (err || error) {
          console.log(err + error);
        } else {
          return res.redirect('/profile/');
        }
      });

    }
  });
});


module.exports = router;

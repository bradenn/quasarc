var router = require('express').Router();
var User = require('../models/user');
var Post = require('../models/textpost');
var Picture = require('../models/picture');
const request = require("request");


router.get('/', function(req, res, next) {

  User.findById(req.session.userId).populate("realms")
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          return res.redirect('/login');
        } else {
          if(user.spotify_account != null){
          const optionsA = {
            url: "http://nossl.bradenn.com:3011/refresh_token?refresh_token=" + user.spotify_account.refresh_token,
          };
          request(optionsA, function(e, r, objA) {
            var access_token = JSON.parse(objA).access_token;
            const options = {
              url: "https://api.spotify.com/v1/me/player/currently-playing",
              headers: {
                'Authorization': 'Bearer ' + access_token
              }
            };
            request(options, function(e, r, obj) {
              return res.render("profile", {
                user: user,
                spotify: obj
              });
            })
          })
        }else{
          return res.render("profile", {
            user: user,
            spotify: null
          });
        }

        }
      }
    });
});


router.post('/:type', function(req, res, next) {
  if (req.params.type == "badge") {
    var e = [];
    if (req.body.pride === 'true') {
      e.push("🏳️‍🌈");
    }
    if (req.body.usa === 'true') {
      e.push("🇺🇸");
    }
    User.findOne({
      _id: req.session.userId
    }, function(err, user) {
      user.badge = e;
      user.save(function(err) {
        if (err) {

        }
      });
    });
  }
  if (req.params.type == "bio") {
    User.findOne({
      _id: req.session.userId
    }, function(err, user) {
      user.bio = req.body.body;
      user.save(function(err) {
        if (err) {

        }
      });
    });
  }

  res.redirect(req.get('referer'));
});

module.exports = router;

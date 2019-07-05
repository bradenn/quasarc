var router = require('express').Router();
var User = require('../models/user');
var Post = require('../models/textpost');
const request = require("request");
// GET route for reading data

router.get('/', function(req, res, next) {
  res.redirect("/404");
});

router.get('/:username', function(req, res, next) {
  User.findOne({
      username: req.params.username
    })
    .exec(function(error, target) {
      if (error) {
        return next(error);
      } else {
        if (target == null) {
          res.redirect("/404");
        } else {
          User.findById(req.session.userId).populate("realms").populate("users")
            .exec(function(error, user) {
              if (error) {
                return next(error);
              } else {
                Post.Text.find({
                    user: target._id
                  }).populate("comments").populate("realm")
                  .exec(function(error, post) {
                    if (error) {
                      return next(error);
                    } else {
                      if(target.spotify_account != null){
                      const optionsA = {
                        url: "http://nossl.bradenn.com:3011/refresh_token?refresh_token=" + target.spotify_account.refresh_token,
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
                          return res.render("user", {
                            user: user,
                            post: post,
                            target: target,
                            spotify: obj
                          });
                        })
                      })
                    }else{
                      return res.render("user", {
                        user: user,
                        post: post,
                        target: target,
                        spotify: ""
                      });
                    }

                    }
                  });
              }
            });
        }
      }
    });

});
router.get('/e/:user/:status', function(req, res, next) {
  User.findById(req.params.user)
    .exec(function(error, target) {
      if (error) {
        return next(error);
      } else {
        if (target == null) {
          res.redirect("/404");
        } else {
          if (req.params.status == "follow") {
            User.findByIdAndUpdate(req.session.userId, {
              $push: {
                users: [req.params.user]
              }
            }, function(err, user) {
              res.redirect(req.get('referer'));
            });
          } else if (req.params.status == "unfollow") {
            User.findByIdAndUpdate(req.session.userId, {
              $pullAll: {
                users: [req.params.user]
              }
            }, function(err, user) {
              res.redirect(req.get('referer'));
            });
          }

        }
      }
    });

});
module.exports = router;

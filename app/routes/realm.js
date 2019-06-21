var router = require('express').Router();
var User = require('../models/user');
var Realm = require('../models/realm');
var Post = require('../models/textpost');
var mongoose = require('mongoose');
// GET route for reading data

router.get('/', function(req, res, next) {
  res.redirect("/404");
});

router.get('/:realm', function(req, res, next) {
  Realm.findOne({
      name: req.params.realm
    }).populate("moderator").populate("owner")
    .exec(function(error, realm) {
      if (error) {
        return next(error);
      } else {
        if (realm == null) {
          res.redirect("/404");
        } else {
          User.findById(req.session.userId).populate("realms")
            .exec(function(error, user) {
              if (error) {
                return next(error);
              } else {
                Post.Text.find({
                    realm: realm._id
                  }).populate("comments").populate("realm")
                  .exec(function(error, post) {
                    if (error) {
                      return next(error);
                    } else {
                      return res.render("realm", {
                        user: user,
                        post: post,
                        realm: realm
                      });
                    }
                  });
              }
            });
        }
      }
    });

});
router.get('/e/:realm/:status', function(req, res, next) {
  Realm.findById(req.params.realm)
    .exec(function(error, realm) {
      if (error) {
        return next(error);
      } else {
        if (realm == null) {
          res.redirect("/404");
        } else {
          if (req.params.status == "follow") {
            User.findByIdAndUpdate(req.session.userId, {
              $push: {
                realms: [req.params.realm]
              }
            }, function(err, user) {
              res.redirect(req.get('referer'));
            });
          } else if (req.params.status == "unfollow") {
            User.findByIdAndUpdate(req.session.userId, {
              $pullAll: {
                realms: [req.params.realm]
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

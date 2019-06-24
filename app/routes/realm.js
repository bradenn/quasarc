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
          User.findById(req.session.userId)
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

router.post('/manage/:realm/:action', function(req, res, next) {
  if (req.params.action == "addmod") {
    Realm.findOne({
        name: req.params.realm
      })
      .exec(function(error, realm) {
        if (realm != null) {
          User.findById(req.session.userId)
            .exec(function(error, user) {
              if (realm.owner.toString() === user._id.toString()) {
                User.findOne({
                    username: req.body.username
                  })
                  .exec(function(error, target) {
                    if (target != null) {
                      Realm.findByIdAndUpdate(realm._id, {
                        $push: {
                          moderator: [target._id]
                        }
                      }, function(err, eh) {
                        if(err || error){
                          console.log(err + error);
                        }else{


                        }
                      });
                    }
                  });
              } else {
                console.log("Must be owner of realm")
              }
            });
        } else {
          console.log("Realm not found")


        }
      });
  }
  res.redirect(req.get('referer'));
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

var router = require('express').Router();
var User = require('../models/user');
var Realm = require('../models/realm');
var Post = require('../models/textpost');
// GET route for reading data

router.get('/', function(req, res, next) {
  res.redirect("/404");
});

router.get('/:realm', function(req, res, next) {
  Realm.findOne({
      name: req.params.realm
    })
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
                  }).populate("comments")
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

module.exports = router;

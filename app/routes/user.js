var router = require('express').Router();
var User = require('../models/user');
var Post = require('../models/textpost');
// GET route for reading data

router.get('/', function(req, res, next) {
      res.redirect("/404");
    });

    router.get('/:username', function(req, res, next) {
      User.findOne({username: req.params.username})
        .exec(function(error, target) {
          if (error) {
            return next(error);
          } else {
            if(target == null){
              res.redirect("/404");
            }else{
              User.findById(req.session.userId).populate("realms")
                .exec(function(error, user) {
                  if (error) {
                    return next(error);
                  } else {
                    Post.Text.find({
                        user: target.username
                      }).populate("comments")
                      .exec(function(error, post) {
                        if (error) {
                          return next(error);
                        } else {
                          return res.render("user", {
                            user: user,
                            post: post,
                            target: target
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

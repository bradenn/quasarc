var router = require('express').Router();
var User = require('../models/user');
var Text = require('../models/textpost');
// GET route for reading data

router.get('/', function(req, res, next) {
      res.redirect("/404");
    });

    router.get('/:username', function(req, res, next) {
      User.findOne({username: req.params.username})
        .exec(function(error, user) {
          if (error) {
            return next(error);
          } else {
            if(user == null){
              res.redirect("/404");
            }else{

            }
          }
        });
      User.findById(req.session.userId)
        .exec(function(error, user) {
          if (error) {
            return next(error);
          } else {
            Text.find({
                user: req.params.username
              })
              .exec(function(error, post) {
                if (error) {
                  return next(error);
                } else {
                  return res.render("user", {
                    user: user,
                    post: post
                  });
                }
              });
          }
        });
    });

    module.exports = router;

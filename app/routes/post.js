var router = require('express').Router();
var User = require('../models/user');
var Posts = require('../models/textpost');
var Comment = require('../models/comment');
var faker = require('faker');
// GET route for reading data
router.get('/:id', function(req, res, next) {

  User.findById(req.session.userId)
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        Posts.findById(req.params.id)
          .exec(function(error, post) {
            if (error) {
              return next(error);
            } else {
              return res.render("post", {
                user: user,
                post: post
              });
            }
          });
      }
    });
});

router.post('/:id', function(req, res, next) {
  // confirm that user typed same password twice
  if (req.body.body) {
    User.findById(req.session.userId)
      .exec(function(error, user) {
        if (error) {
          return next(error);
        } else {
          var data = {
            body: req.body.body,
            user: user.username
          };
          Posts.update({
              _id: req.params.id
            }, {
              $push: {
                comments: data
              }
            },
            function(error, success) {
              if (error) {

              } else {
                res.redirect("/p/"+req.params.id);
              }
            }
          );
        }
      });

  }
});



module.exports = router;

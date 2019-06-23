var router = require('express').Router();
var User = require('../models/user');
var Post = require('../models/textpost');
var faker = require('faker');
// GET route for reading data
router.get('/:id', function(req, res, next) {

  User.findById(req.session.userId).populate("realms")
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        Post.Text.findById(req.params.id).populate("comments").populate("realm")
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

          var postData = {
            author: user.username,
            body: req.body.body,
            date: new Date()
          }

          Post.Comment.create(postData, function(error, post) {
            if (error) {
              return next(error);
            } else {
              Post.Text.updateOne({
                  _id: req.params.id
                }, {
                  $push: {
                    comments: post._id
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

  }
});



module.exports = router;

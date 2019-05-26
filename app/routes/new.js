var router = require('express').Router();
var User = require('../models/user');
var Posts = require('../models/textpost');

// GET route for reading data
router.get('/', function(req, res, next) {

  User.findById(req.session.userId)
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        if (user != null) {
          return res.render("new", {
            user: user
          });
        } else {
          res.redirect("/login");
        }

      }
    });
});

//POST route for updating data
router.post('/', function(req, res, next) {
  // confirm that user typed same password twice
  console.log(req.body.body);
  if (req.body.title &&
    req.body.section &&
    req.body.body) {
    User.findById(req.session.userId)
      .exec(function(error, user) {
        if (error) {
          return next(error);
        } else {
          if (user != null) {
            var postData = {
              title: req.body.title,
              section: req.body.section,
              post: req.body.body,
              user: user.username
            }

            Posts.create(postData, function(error, post) {
              if (error) {
                return next(error);
              } else {
                return res.redirect('/p/'+post._id);
              }
            });
          } else {
            res.redirect("/login");
          }

        }
      });


  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

module.exports = router;

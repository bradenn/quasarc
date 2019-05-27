var router = require('express').Router();
var User = require('../models/user');
var Posts = require('../models/textpost');
// GET route for reading data
router.get('/:id', function(req, res, next) {
  var userData;
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



module.exports = router;

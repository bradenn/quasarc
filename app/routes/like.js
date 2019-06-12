var router = require('express').Router();
var User = require('../models/user');
var Like = require('../models/like');


// GET route for reading data

router.get('/:post&:score&:user', function(req, res, next) {

  User.findById(req.session.userId)
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        if (user != null) {
          var likeData = {
            user: req.params.user,
            post: req.params.post,
            score: req.params.score
          }
          if (req.params.score == 1 || req.params.score == -1 || req.params.score == 0) {
            Like.create(likeData, function(error, data) {
              if (error) {
                return next(error);
              } else {
                  res.send("Ye ye");
              }
            });
          }else{
            var err = new Error('Stop being stupid. - Braden');
            err.status = 400;
            return next(err);
          }
        } else {
          res.redirect("/login");
        }

      }
    });
});


module.exports = router;

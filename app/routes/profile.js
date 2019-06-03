var router = require('express').Router();
var User = require('../models/user');
var Text = require('../models/textpost');

router.get('/', function(req, res, next) {

  User.findById(req.session.userId)
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          return res.redirect('/login');
        } else {
          Promise.all([
            Text.find({
              user: user.username
            }),
            Text.find({
              comments: {
                $elemMatch: {
                  user: user.username
                }
              }
            })
          ]).then(([post, comments]) => {
            return res.render("profile", {
              user: user,
              post: post,
              comments: comments
            });
          });
        }
      }
    });
});

router.post('/', function(req, res, next) {
  var e = [];
  if (req.body.pride === 'true') {
    e.push("🏳️‍🌈");
  }
  if (req.body.usa === 'true') {
    e.push("🇺🇸");
  }
  User.findOne({
    _id: req.session.userId
  }, function(err, user) {
    user.badge = e;
    user.save(function(err) {
      if (err) {
        console.error('ERROR!');
      }
    });
  });


  res.redirect("/profile");
});

module.exports = router;

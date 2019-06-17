var router = require('express').Router();
var User = require('../models/user');
var Post = require('../models/textpost');
var Picture = require('../models/picture');

router.get('/', function(req, res, next) {

  User.findById(req.session.userId).populate("picture")
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          return res.redirect('/login');
        } else {
          Promise.all([
            Post.Text.find({
              user: user.username
            }),
            Post.Text.find({
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

router.post('/:type', function(req, res, next) {
  if (req.params.type == "badge") {
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

        }
      });
    });
  }
  if (req.params.type == "bio") {
    User.findOne({
      _id: req.session.userId
    }, function(err, user) {
      user.bio = req.body.body;
      user.save(function(err) {
        if (err) {

        }
      });
    });
  }

  res.redirect(req.get('referer'));
});

module.exports = router;

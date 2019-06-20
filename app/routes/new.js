var router = require('express').Router();
var User = require('../models/user');
var Posts = require('../models/textpost');
var Realm = require('../models/realm');

// GET route for reading data
router.get('/post', function(req, res, next) {

  User.findById(req.session.userId).populate("realms")
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        if (user != null) {
          Realm.find({})
            .exec(function(error, realm) {
              if (error) {
                return next(error);
              } else {
                if (user != null) {
                  return res.render("newpost", {
                    user: user,
                    realm: realm
                  });
                } else {

                }

              }
            });
        } else {
          res.redirect("/login");
        }

      }
    });
});

//POST route for updating data
router.post('/post', function(req, res, next) {
  // confirm that user typed same password twice
  if (req.body.title &&
    req.body.section &&
    req.body.body) {
    User.findById(req.session.userId)
      .exec(function(error, user) {
          if (error) {
            return next(error);
          } else {
            Realm.findOne({
                name: req.body.section
              })
              .exec(function(error, realm) {
                if (error) {
                  return next(error);
                } else {
                  if (user != null) {
                    var postData = {
                      title: req.body.title,
                      realm: realm._id,
                      post: req.body.body,
                      user: user.username,
                      date: new Date()
                    }

                    Posts.Text.create(postData, function(error, post) {
                      if (error) {
                        return next(error);
                      } else {
                        return res.redirect('/p/' + post._id);
                      }
                    });
                  }
                }
              });
            }

      });


} else {
  var err = new Error('All fields required.');
  err.status = 400;
  return next(err);
}
});

// GET route for reading data
router.get('/realm', function(req, res, next) {

  User.findById(req.session.userId).populate("realms")
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        if (user != null) {
          Realm.find({})
            .exec(function(error, realm) {
              if (error) {
                return next(error);
              } else {
                if (user != null) {
                  return res.render("newrealm", {
                    user: user,
                    realm: realm
                  });
                } else {

                }

              }
            });
        } else {
          res.redirect("/login");
        }

      }
    });
});

//POST route for updating data
router.post('/realm', function(req, res, next) {
  // confirm that user typed same password twice
  if (req.body.name &&
    req.body.desc) {
    User.findById(req.session.userId)
      .exec(function(error, user) {
          if (error) {
            res.redirect("/login");
          } else {
            if (user != null) {
              var postData = {
                name: req.body.name,
                bio: req.body.desc,
                owner: user._id,
                nsfw: false
              }
              Realm.create(postData, function(error, post) {
                if (error) {
                  return next(error);
                } else {
                  return res.redirect('/r/' + post.name);
                }
              });
            }
            }

      });


} else {
  var err = new Error('All fields required.');
  err.status = 400;
  return next(err);
}
});

module.exports = router;

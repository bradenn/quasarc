var router = require('express').Router();
var User = require('../models/user');
var Posts = require('../models/textpost');
var Realm = require('../models/realm');

// GET route for reading data
router.get('/', function(req, res, next) {

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
                  return res.render("new", {
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
router.post('/', function(req, res, next) {
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
})

module.exports = router;

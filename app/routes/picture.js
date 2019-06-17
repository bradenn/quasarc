var router = require('express').Router();
var Picture = require('../models/picture');
var User = require('../models/user');
var fs = require('fs');
const multer = require('multer')
const upload = multer({
  dest: 'uploads/'
})

router.get('/:id', function(req, res, next) {

  Picture.findById(req.params.id)
    .exec(function(error, pic) {
      if (error) {
        return next(error);
      } else {
        var thumb = pic.picture;
        res.render('picture', {
          title: 'Express',
          img: thumb
        });
      }
    });
});

router.post('/upload', upload.single('file'), function(req, res, next) {



  function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    fs.unlinkSync(file);
    return new Buffer.from(bitmap).toString('base64');
  }
  const t = base64_encode(req.file.path);
  //console.log(t);
  var postData = {
    picture: t
  }

  Picture.create(postData, function(error, pic) {
    if (error) {
      return next(error);
    } else {
      User.findOne({
        _id: req.session.userId
      }, function(err, user) {
        user.picture = pic._id;
        user.save(function(err) {
          if (err) {

          }
          res.redirect(req.get('referer'));
        })

      });
    }

  });
});

module.exports = router;

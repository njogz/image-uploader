var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/imageUploader');

router.get('/', function(req, res){
  var collection = db.get('images');
  collection.find({}, function(err, images){
    if (err) throw err;
    res.json(images);
  });
});

router.post('/', function(req, res){
  var collection = db.get('images');
  collection.insert({
      title: req.body.title,
      description: req.body.description,
      image_name: req.file.originalname,
      image_path: req.file.filename
  }, function(err, image){
      if (err) throw err;
      res.json(image);
  });
});

router.get('/:id', function(req, res) {
    var collection = db.get('images');
    collection.findOne({ _id: req.params.id }, function(err, image){
        if (err) throw err;

      	res.json(image);
    });
});
router.delete('/:id', function(req, res) {
  console.log('Called');
    var collection = db.get('images');
    collection.remove({ _id: req.params.id }, function(err, image){
        if (err) throw err;

      	res.json(image);
    });
});
router.put('/:id', function(req, res){
    var collection = db.get('images');
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        description: req.body.description
    }, function(err, image){
        if (err) throw err;

        res.json(image);
    });
});



module.exports = router;

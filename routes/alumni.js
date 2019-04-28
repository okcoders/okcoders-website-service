var express = require('express');
var router = express.Router();
const alumni = require('../models/alumni')


/* GET users listing. */
router.get('/', function(req, res, next) {
  alumni.find((err, alum) => {
    if (err) {
      console.error("couldnt get alumn", err)
      res.send('couldnt get alumni');
    } else {
      res.json(alum)
    }
  })
});

router.post('/', function(req, res, next) {
  var newAlumni = new alumni(req.body.newAlumni);
  newAlumni.save(function(err, results){
      if(err) {
          console.error("got an error for ", req.body, "error message: ", err)
          res.status(500);
      } else {
          res.status(201).send(newAlumni._id)
      }})
    });
router.get('/:firstName', function(req, res, next) {
  alumni.find((err, alum) => {
    if (err) {
      console.error("couldnt get alumn", err)
      res.send('couldnt get alumni');
    } else {
      res.render(alum)
    }
  })
});

module.exports = router;

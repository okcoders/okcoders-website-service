var express = require('express');
var router = express.Router();
const alumni = require('../models/alumni')
require('../models/class')
require('../models/language')


/* GET users listing. */
router.get('/', function(req, res, next) {
  alumni.find().populate({path: 'classes', populate: {path: 'languages'}}).exec((err, alum) => {
    if (err) {
      console.error("couldnt get alumn", err)
      res.send('couldnt get alumni');
    } else {
      res.json(alum)
    }
  })
});

router.post('/', function (req, res, next) {
  var newAlumni = new alumni(req.body.newAlumni);
  var errors = [];

  function findEmptyField() {
    Object.keys(req.body.newAlumni).forEach((value) => {
      console.log(value);
      if (newAlumni[value] === "") {
        errors.push(value)
      }
    });
  }

  findEmptyField();
  console.log(errors);

  if (errors.length > 0) {
    res.status(400).send(errors.join(", \n"))
  }
  else {
    newAlumni.save(function (err, results) {
      if (err) {
        console.error("got an error for ", req.body, "error message: ", err)
        res.status(500);
      } else {
          res.status(201).send(newAlumni._id)
      }})
    });

router.get('/:id', function(req, res, next) {
  alumni.findById(req.params.id, (err, alum) => {
    if (err) {
      console.error("couldnt get alumn", err)
      res.status(404).send("Couln't find a Bio for that Alumnus");
    } else {
      res.json(alum)
    }
  })
});

module.exports = router;

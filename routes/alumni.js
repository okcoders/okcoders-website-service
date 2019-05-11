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
      }
    })
  }

});

module.exports = router;

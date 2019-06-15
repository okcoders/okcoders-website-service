var express = require('express');
var router = express.Router();
var _ = require('lodash')
const alumni = require('../models/alumni')
require('../models/class')
require('../models/language')
const auth = require('../middleware/middleware')


/* GET users listing. */
router.get('/', auth, function(req, res, next) {
  alumni
    .find()
    .populate({path: 'classes', populate: {path: 'languages'}})
    .lean()
    .exec((err, alum) => {
        if (err) {
          console.error("couldnt get alumn", err)
          res.send('couldnt get alumni');
        } else {
          res.json(modifyAlumniResponse(alum))
        }
  })
});

function modifyAlumniResponse(alum) {
    return alum.map(o => {
        if (o.classes) {
            o.numberOfClasses = o.classes.length
            o.languages = _(o.classes)
                .map(c => c.languages)
                .flatten()
                .map(l => l.language)
                .uniq()
                .values()
        } else {
            o.numberOfClasses = 0
            o.languages = []
        }

        delete o.classes
        return o
    })
}

router.post('/', function(req, res, next) {
  var newAlumni = new alumni(req.body.newAlumni);
  var errors = [];

  function findEmptyField() {
    Object.keys(req.body.newAlumni).forEach((value) => {
      console.log(newAlumni[value].length,value);
      if (!newAlumni[value] || newAlumni[value].length <= 0) {
        errors.push(value)
      }
    });
  }

  findEmptyField();

  if (errors.length > 0) {
    res.status(400).send(errors.join(", \n"))
  }
  else {
    newAlumni.save(function (err, results) {
      if (err) {
        console.error("got an error for ", req.body, "error message: ", err)
        res.status(400);
      } else {
          res.status(201).send(newAlumni._id)
      }
    })
  }
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

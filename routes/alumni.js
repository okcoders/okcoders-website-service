var express = require('express');
var router = express.Router();
const Alumni = require('../models/alumni')

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
  var alumni = new Alumni(req.body.newAlumni);
  alumni.save(function(err, results){
      if(err) {
          console.log(req.body);
          res.status(404);
      } else {
          res.status(201).send('Alumni Added')
      }
  })
});

module.exports = router;

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

module.exports = router;

var express = require('express');
var router = express.Router();
const admin = require('../models/admin')

/* GET users listing. */
router.get('/', function (req, res, next) {
    admin.find((err, alum) => {
        if (err) {
            console.error("couldnt get admin", err)
            res.send('couldnt get admin');
        } else {
            res.json(alum)
        }
    })
});

module.exports = router;
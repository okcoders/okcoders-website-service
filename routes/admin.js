var express = require('express');
var router = express.Router();
const admin = require('../models/class')

/* GET users listing. */
router.get('/', function (req, res, next) {
    admin.find((err, adm) => {
        if (err) {
            console.error("couldnt get admin", err)
            res.send('couldnt get admin');
        } else {
            res.json(adm)
        }
    })
});

module.exports = router;
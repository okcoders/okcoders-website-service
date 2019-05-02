var express = require('express');
var router = express.Router();
const classes = require('../models/class')

/* GET users listing. */
router.get('/', function (req, res, next) {
    classes.find((err, clas) => {
        if (err) {
            console.error("couldnt get class", err)
            res.send('couldnt get class');
        } else {
            res.json(clas)
        }
    })
});

router.post('/', function (req, res, next) {
    const languageTags = req.body.newClass.tags.split(',').map(val => val.trim());
    const newClass = new classes({ languageTags, ...req.body.newClass });
    newClass.save((err, clas) => {
        if (err) {
            console.error("couldnt get class", err)
            res.send('couldnt get class');
        } else {
            res.json(clas)
        }
    });
});

router.delete('/', function (req, res, next) {
    classes.remove((err, clas) => {
        if (err) {
            console.error("couldnt get class", err)
            res.send('couldnt get class');
        } else {
            res.json(clas)
        }
    })
});

module.exports = router;
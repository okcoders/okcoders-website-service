var express = require('express');
var router = express.Router();
const classes = require('../models/class')

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
    console.log(req.body);
    const languageTags = req.body.tags.split(',').map(val => val.trim());
    const newClass = new classes({ languageTags, ...req.body });
    newClass.save((err, clas) => {
        if (err) {
            console.error("couldnt get class", err)
            res.send('couldnt get class');
        } else {
            res.json(clas)
        }
    });
});

router.delete('/:id', function (req, res, next) {
    const course = classes.findByIdAndDelete(req.params.id)
        .then(course => res.sendStatus(204));
});

module.exports = router;
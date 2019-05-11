var express = require('express');
var router = express.Router();
const classes = require('../models/class')

router.get('/', function (req, res, next) {
    classes.find((err, course) => {
        if (err) {
            console.error("couldnt get class", err)
            res.send('couldnt get class');
        } else {
            res.json(course)
        }
    })
});

router.post('/', function (req, res, next) {
    const languageTags = req.body.tags.split(',').map(val => val.trim());
    const newClass = new classes({ languageTags, ...req.body });
    newClass.save((err, course) => {
        if (err) {
            console.error("couldnt get class", err)
            res.status(400).send('Unable to add.');
        } else {
            res.json(course)
        }
    });
});

router.delete('/:id', function (req, res, next) {
    classes.findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(204))
        .catch(err => res.status(400).send('Unable to delete.'));
});

router.put('/', function (req, res, next) {
    const languageTags = req.body.tags.split(',').map(val => val.trim());
    const record = { ...req.body, languageTags };
    classes.findByIdAndUpdate(record._id, record, (err, clas) => {
        if (err) {
            console.error("couldnt get class", err)
            res.send('couldnt get class');
        } else {
            res.json(clas)
        }
    })
});

module.exports = router;
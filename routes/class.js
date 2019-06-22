var express = require('express');
var router = express.Router();
const classes = require('../models/class')
const auth = require('../middleware/middleware')

router.get('/', function (req, res, next) {
    classes
        .find()
        .populate('languages')
        .exec((err, course) => {
            if (err) {
                console.error("couldnt get class", err)
                res.send('couldnt get class');
            } else {
                res.json(course)
            }
        })
});

router.post('/', auth, function (req, res, next) {
    const newClass = new classes(req.body);
    newClass.save((err, course) => {
        if (err) {
            console.error("couldnt get class", err)
            res.status(400).send('Unable to add.');
        } else {
            res.json(course)
        }
    });
});

router.delete('/:id', auth, function (req, res, next) {
    classes.findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(204))
        .catch(err => res.status(400).send('Unable to delete.'));
});

router.put('/', auth, function (req, res, next) {
    const record = req.body;
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
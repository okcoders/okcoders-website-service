var express = require('express');
var router = express.Router();
const language = require('../models/language')

router.get('/', function (req, res, next) {
    language
        .find()
        .exec((err, languages) => {
            if (err) {
                console.error("couldnt get langauge", err)
                res.send('couldnt get language');
            } else {
                res.json(languages)
            }
        })
});

router.post('/', function (req, res, next) {
    const newLanguage = new language(req.body);
    newLanguage.save((err, langauge) => {
        if (err) {
            console.error("couldnt get language", err)
            res.status(400).send('Unable to add.');
        } else {
            res.json(langauge)
        }
    });
});

router.delete('/:id', function (req, res, next) {
    language.findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(204))
        .catch(err => res.status(400).send('Unable to delete.'));
});

module.exports = router;
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

module.exports = router;
var express = require('express');
var router = express.Router();
var _ = require('lodash')
const user = require('../models/user')
const bc = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/login', function (req, res, next) {
	user
		.findOne({ username: req.body.username })
		.exec((err, matchedUser) => {
			if (err) {
				console.error("couldnt get user", err)
				res.send('couldnt get user');
			} else if (!matchedUser) {
				res.status(404).send('screw off')
			} else {
				const payload = { user: {id: matchedUser.toObject()._id }  }
				const correctPassword = bc.compareSync(req.body.password, matchedUser.password)
				if (correctPassword) {
					const token = jwt.sign(payload, 'shhhh', { expiresIn: '14d' })
					res.json({ token })
				} else {
					res.status(401).send('screw off')
				}
			}
		})
});

module.exports = router;

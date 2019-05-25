const prompt = require('prompt');
const bc = require('bcrypt')
const User = require('../models/user')
var config = require('../config/app.local.conf.js')
var mongoose = require('mongoose');

mongoose.connect(config.dbUrl, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("we are connected")
	prompt.start();

	prompt.get(['username', 'password'], function (err, result) {
		console.log('Command-line input received:');
		console.log('  username: ' + result.username);
		console.log('  email: ' + result.password);
		const hashedPassword = bc.hashSync(result.password, 10)
		const user = new User({ username: result.username, password: hashedPassword })
		console.log(user)
		user.save((err, result) => {
			if (err) console.log(err)
			if (result) console.log(result)
		})
	});
});

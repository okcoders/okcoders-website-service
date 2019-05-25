var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors')
var config = require('./config/app.local.conf.js')

var indexRouter = require('./routes/index');
var alumniRouter = require('./routes/alumni');
var classRouter = require('./routes/class');
var languageRouter = require('./routes/language');
const userRouter = require('./routes/user');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const allowedOrigins = ['http://localhost:3000',
	'https://okcoders.com'];
app.use(cors({
	origin: function (origin, callback) {
		// allow requests with no origin
		// (like mobile apps or curl requests)
		if (!origin) return callback(null, true);
		if (allowedOrigins.indexOf(origin) === -1) {
			var msg = 'The CORS policy for this site does not ' +
				'allow access from the specified Origin.';
			return callback(new Error(msg), false);
		}
		return callback(null, true);
	}
}));

mongoose.connect(config.dbUrl, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("we are connected")
});

app.use('/', indexRouter);
app.use('/alumni', alumniRouter);
app.use('/class', classRouter);
app.use('/language', languageRouter);
app.use('/user', userRouter);

module.exports = app;

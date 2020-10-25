var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var readingRouter = require('./routers/reading');
require('dotenv').config();

var app = express();

var PORT = 8080;
var USER_NAME = process.env.USER_NAME;
var PASSWORD = process.env.PASSWORD;
var HOST_NAME = 'cluster0.xusy1.mongodb.net';
var DATABASE_NAME = 'PoolPal';

mongoose.connect('mongodb+srv://' + USER_NAME + ':' + PASSWORD + '@' + HOST_NAME + '/' + DATABASE_NAME);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', readingRouter);

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});
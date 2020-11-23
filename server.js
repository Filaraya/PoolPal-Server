// require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var readingRouter = require('./routers/reading');
var userRouter = require('./routers/user');
var chemicalRouter = require('./routers/chemicals');
var cors = require('cors');

var app = express();

app.use(cors());

var PORT = 8080;
var USER_NAME = process.env.USER_NAME;
var PASSWORD = process.env.PASSWORD;
var HOST_NAME = 'cluster0.xusy1.mongodb.net';
var DATABASE_NAME = 'PoolPal';

connect('mongodb+srv://' + USER_NAME + ':' + PASSWORD + '@' + HOST_NAME + '/' + DATABASE_NAME);

app.use(json());
app.use(urlencoded({
    extended: true
}));

app.use('/api', readingRouter);
app.use('/api', userRouter);
app.use('/api', chemicalRouter);

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});
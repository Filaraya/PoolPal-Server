var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var itemRouter = require('./routers/item');
var env = require('.env')

var app = express();

var PORT = 8080;
var USER_NAME = env.USER_NAME;
var PASSWORD = env.PASSWORD;
var HOST_NAME = 'cluster0.xusy1.mongodb.net';
var DATABASE_NAME = 'shoppingList';

mongoose.connect('mongodb+srv://' + USER_NAME + ':' + PASSWORD + '@' + HOST_NAME + '/' + DATABASE_NAME);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', itemRouter);

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});
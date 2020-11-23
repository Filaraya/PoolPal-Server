// require('dotenv').config();
import express from 'express';
import { connect } from 'mongoose';
import { json, urlencoded } from 'body-parser';
import readingRouter from './routers/reading';
import userRouter from './routers/user';
import chemicalRouter from './routers/chemicals';
import cors from 'cors';

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
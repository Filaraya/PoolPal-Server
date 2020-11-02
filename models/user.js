var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checmicalSchema = new Schema({
    chlorine: {
        type: String,
        required: false,
    },
    ph_up: {
        type: String,
        required: false,
    },
    ph_down: {
        type: String,
        required: false,
    },
    alkalinity_up: {
        type: String,
        required: false,
    },
    alkalinity_down: {
        type: String,
        required: false,
    },
    calcium_up: {
        type: String,
        required: false,
    },
    calcium_down: {
        type: String,
        required: false,
    },
})

var userSchema = new Schema({
    user_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    pool_gallons: {
        type: Number,
        required: false,
    },
    pool_type: {
        type: String,
        required: false,
    },
    chemicals: [checmicalSchema],
}, { collection: 'User' });

module.exports = mongoose.model('User', userSchema);
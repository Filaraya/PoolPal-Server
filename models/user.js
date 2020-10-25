var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
    },

}, { collection: 'User' });

module.exports = mongoose.model('User', userSchema);
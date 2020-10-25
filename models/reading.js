var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var readingSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
    },
    reading_date: {
        type: Date,
        required: true,
    },
    free_chlorine: {
        type: Number,
        required: false,
    },
    combined_chlorine: {
        type: Number,
        required: false,
    },
    ph: {
        type: Number,
        required: false,
    },
    alkalinity: {
        type: Number,
        required: false,
    },
    calcium: {
        type: Number,
        required: false,
    },
    cyanuric_acid: {
        type: Number,
        required: false,
    },
}, { collection: 'Reading' });

module.exports = mongoose.model('Reading', readingSchema);
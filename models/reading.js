var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var readingSchema = new Schema({
    id: {
        type: Number,
        unique: true,
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
        required: true,
    },
    ph: {
        type: Number,
        required: true,
    },
    alkalinity: {
        type: Number,
        required: true,
    },
    calcium: {
        type: Number,
        required: true,
    },
    cyanuric_acid: {
        type: Number,
        required: true,
    },
}, { collection: 'dataItems' });

module.exports = mongoose.model('Reading', readingSchema);
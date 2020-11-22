var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chemicalSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    effects: {
        type: Array,
        required: true,
    },
    free_chlorine: {
        type: Number,
        required: false,
    },
    cyanuric_acid: {
        type: Number,
        required: false,
    },
    ph: {
        type: Number,
        required: false,
    },
    calcium: {
        type: Number,
        required: false,
    },
    alkalinity: {
        type: Number,
        required: false,
    },
    borate: {
        type: Number,
        required: false,
    },
}, { collection: 'Chemicals' });

module.exports = mongoose.model('Chemicals', chemicalSchema);

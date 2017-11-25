'use strict';

var mongoose = require('mongoose');

var sensorSchema = new mongoose.Schema({
    //id: {type: String, required: true},
    time: {type: Date},
    sensorType: {type: String, required: true},
    valueLength: {type: Number, required: true},
    values: {type: Array, required: true},
    topic: {type: String},
    truck: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Truck' }]
});

module.exports = mongoose.model('Sensor', sensorSchema);

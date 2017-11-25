'use strict';

var mongoose = require('mongoose');

var sensorSchema = new mongoose.Schema({
    id: {type: String, required: true},
    time: {type: Date, required: true},
    sensorType: {type: String, required: true},
    values: {type: Array, required: true}
});

module.exports = mongoose.model('Sensor', sensorSchema);

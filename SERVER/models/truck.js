'use strict';

var mongoose = require('mongoose');

var truckSchema = new mongoose.Schema({
    number: {type: String, required: true},
    name: {type: String, required: true},
    delivery: {type: String, required: true},
    date: {type: Date, required: true},
    mintemp: {type: Number},
    maxtemp: {type: Number},
    minpressure: {type: Number},
    maxpressure: {type: Number},
    isFragile: {type: Boolean},
    isFood: {type: Boolean},
    isPressure: {type: Number},
    sensors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sensor' }]
});

module.exports = mongoose.model('Truck', truckSchema);

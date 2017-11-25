'use strict';

var Sensors = require('../models/sensor');

function addSensor(callback, id, time, type, values) {

    var sensor = new Sensor({
        id: name,
        time: time,
        sensorType: type,
        values: values
    });

    sensor.save(function (err) {
        callback(err);
    });

}

function getSensors(callback) {

    Sensors.find({}, function (err, sensors) {
        callback(err, sensors);
    });

}

function getSensorbyID(callback, id) {

    Sensors.find({id: id}, function (err, sensors) {
        callback(err, sensors);
    });

}

module.exports.addSensor = addSensor;
module.exports.getSensors = getSensors;
module.exports.getSensorbyID = getSensorbyID;

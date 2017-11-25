'use strict';

var Truck = require('../models/truck');
var sensorsController = require('./sensorController');
var mongoose = require('mongoose');

function addTruck(number, name, delivery, date,
mintemp, maxtemp, minpressure, maxpressure, isFragile, isFood, isPressure) {

    var tr = new Truck({
        number: number,
        name: name,
        delivery: delivery,
        date: date,
        mintemp: mintemp,
        maxtemp: maxtemp,
        minpressure: minpressure,
        maxpressure: maxpressure,
        isFragile: isFragile,
        isFood: isFood,
        isPressure: isPressure
    });
    console.log(subject);
    tr.save(function (err) {
          if (err) return err;
          console.log("Saved " + subject);
        });

    };



function getTrucks(callback) {

    Truck.find({}).populate('sensors').exec(function (err, trucks) {
        callback(err, trucks);
    });
}

function getTruckbyNumber(callback, number) {

    Truck.find({number: number}).populate('sensors').exec(function (err, sensors) {
        callback(err, sensors);
    });
}

function addSensorToTruck(callback, truck_number, sensorid) {

    sensorController.getSensorbyID(function (err, sensors) {

        if (err) {
            callback(err);
        } else if (!sensors) {
            callback('There is no sensor with that id on database');
        } else if (sensors.length === 0) {
            callback('There is no sensor with that name on database');
        } else {
            Trucks.findOne({number: truck_number}, function (err, truck) {
                if (err) {
                    callback(err);
                } else if (!truck) {
                    callback('There is no truck with that number on database');
                } else if (truck.length === 0) {
                    callback('There is no truck with that number on database');
                } else {
                    var sensors_data = [];
                    for(var i = 0; i < truck.sensors.length; i++) {
                        sensors_data.push(mongoose.Types.ObjectId(truck.sensors[i].id));
                    }
                    sensors_data.push(truck._id);
                    Truck.update({ number: number }, { $set: { sensors: sensors_data }}, function (err, truck) {
                        callback(err);
                    });
                }
            });
        }
    }, truck_number);
}

module.exports.addTruck = addTruck;
module.exports.addSensorToTruck = addSensorToTruck;
module.exports.getTrucks= getTrucks;
module.exports.getTruckbyNumber = getTruckbyNumber;

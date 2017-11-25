'use strict';

var express = require('express');
var router = express.Router();
var exampleRouter = require('./exampleroute/example');
var sensorCntr = require('../controllers/sensorController')
var truclCntr = require('../controllers/truckController')

router.get('/example', exampleRouter.mapIndex);





router.post('/addsensor', function (req, res) {
    try {
          var sensor = req.body;
          sensorCntr.addSensor(sensor.id,sensor.time,sensor.type.sensor.values)
    } catch (err) {
        console.log(err);
    }
});

module.exports.router = router;

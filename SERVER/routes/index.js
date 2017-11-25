'use strict';

var express = require('express');
var router = express.Router();
var exampleRouter = require('./exampleroute/example');
var sensorCntr = require('../controllers/sensorController')
var truclCntr = require('../controllers/truckController')

router.get('/example', exampleRouter.mapIndex);


module.exports.router = router;

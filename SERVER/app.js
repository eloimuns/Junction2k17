'use strict';

// Load environment variables defined at '.env' file
require('dotenv').config();
var path = require("path");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var compression = require('compression');
var mongoose = require('mongoose');
var Truck = require('./models/truck');
var Sensor = require('./models/sensor');

var router = require('./routes/index');
var logger = require('./routes/utils/loggerfactory');

var sensorCntr = require('./controllers/sensorController')
var truckCntr = require('./controllers/truckController')

// Enable transport compression
app.use(compression());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token, userData");
    next();
});

// Serve static assets from the app folder. This enables things like javascript
// and stylesheets to be loaded as expected. Analog to nginx.
app.use('/', express.static(path.join(__dirname, 'public')));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// Parse application/json
app.use(bodyParser.json());

// enables them to specify the verb on header 'X-HTTP-Method-Override'
app.use(methodOverride('X-HTTP-Method-Override'));

// Setup app routes
app.use('/api', router.router);

// Start the server
var configPort = process.env.PORT;
var port = (configPort !== undefined ? configPort : 8888);
var server = app.listen(port, function () {
    console.log("Listening on port " + server.address().port);
});

var configMongoURL = process.env.MONGODB;
var mongoURL = (configMongoURL !== undefined ? configMongoURL : 'mongodb://127.0.0.1:27017/truck_data');
mongoose.connect(mongoURL, {
    useMongoClient: true
});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to database:'));
db.once('open', function() {
    console.log("Connected to the database...");
});


app.post('/addtruck', function (req, res) {
    try {
      var truk = req.body;
      var tr = new Truck({
          number: truk.number,
          name: truk.name,
          delivery: truk.delivery,
          date: truk.date,
          status: "Pending",
          mintemp: truk.mintemp,
          maxtemp: truk.maxtemp,
          minpressure: truk.minpressure,
          maxpressure: truk.maxpressure,
          isFragile: truk.isFragile,
          isFood: truk.isFood,
          isPressure: truk.isPressure
      });
      tr.save(function (err) {
            if (err) return err;
            res.send({
              status: "OK"
            });
          });
    } catch (err) {
        console.log(err);
    }
});

app.get('/trucks', function (req, res) {
    try {
      Truck.find({}).populate('sensors') .exec(function (err, usr) {
        res.send(usr);
      })
    } catch (error) {
        console.log(error);
    }

});

app.get('/sensors', function (req, res) {
    try {
      Sensor.find({}).exec(function (err, usr) {
        res.send(usr);
      })
    } catch (error) {
        console.log(error);
    }

});

app.get('/truck/:id?', function (req, res) {
    try {
      Truck.findOne({number: req.params.id}).populate('sensors').exec(function (err, usr) {
      res.send(usr);
    })
    } catch (error) {
        console.log(error);
    }
});

app.post('/accept/:id?', function (req, res) {
  try {
    Truck.findOne({number: req.params.id}).populate('sensors').exec(function (err, truck) {
      truck.status = "Accepted";
      truck.save(function (err) {
            if (err) return err;
            res.send({
              status: "OK"
            });
          });
      });
    } catch (err) {
        console.log(err);
        res.send({
          status: "ERROR"
        });
    }
})

app.post('/decline/:id?', function (req, res) {
  try {
    Truck.findOne({number: req.params.id}).populate('sensors').exec(function (err, truck) {
      truck.status = "Rejected";
      truck.save(function (err) {
            if (err) return err;
            res.send({
              status: "OK"
            });
          });
      });
    } catch (err) {
        console.log(err);
        res.send({
          status: "ERROR"
        });
    }
})

app.post('/addsensors/:id?', function (req, res) {
    try {
        var Sensors = [];
      Truck.findOne({number: req.params.id}).populate('sensors').exec(function (err, truck) {

          for (var i = 0; i < req.body.length; i++)
          {
            var sensor = Sensors[i] = new Sensor({
              sensorType: req.body[i].sensorType,
              valueLength: req.body[i].valueLength,
              values: req.body[i].values,
              topic: req.body[i].topic
            });

              sensor.save(function(err) {

            }).then(function(a) {
                  truck.sensors.push(a._doc);
                    if (Sensors.length == truck.sensors.length){
                        truck.save(function (err) {

                        });
                    }

              });
          }
          res.send("OK")
      })
    } catch (error) {
        return res.send("ERROR")
        console.log(error);
    }
});


module.exports.server = server;

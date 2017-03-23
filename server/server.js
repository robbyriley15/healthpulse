var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./user');

mongoose.connect('mongodb://localhost/userdata')
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 6969;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.post('/saveUser', function(req,res) {
    var newUser = new User();
    newUser.name = req.body.name;
    newUser.data = {};
    console.log(req.body.name);
    newUser.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'created'});
    })
});

router.get('/subjects', function(req, res) {
    
    User.find({"name": /Riley/},function(err, users) {
            if (err) res.send(err);

            res.json(users);
        });
});

function processRawData(data) {
    var calculated = {};
    var squareDiffTotal = 0;
    var totalRRInterval = 0;
    for (var i = 1; i < data.length; i++) {
        var diffFromPrevious = data[i].RRInterval - data[i-1].RRInterval;
        var diffSquared = diffFromPrevious * diffFromPrevious;
        squareDiffTotal += diffSquared;

        totalRRInterval += data[i].RRInterval;
    }
    var meanRRInterval = totalRRInterval / (data.length - 1); // 1.263  

    var squareDistanceFromMean = 0;
    for (var i = 1; i < data.length; i++) {
        var distanceFromMean = (Math.abs(data[i].RRInterval - meanRRInterval))
        squareDistanceFromMean += distanceFromMean * distanceFromMean;
    }

    var SDNN = Math.sqrt(squareDistanceFromMean / (data.length - 2)) * 1000;
    var RMSSD = Math.sqrt((squareDiffTotal / (data.length - 1))) * 1000;
    
    calculated.SDNN = SDNN;
    calculated.RMSSD = RMSSD;

    return calculated;
}

router.put('/saveData', function(req,res) {
    User.findById(req.body.userId, function(err, user) {
        if (err) res.send(err);
        var data = req.body.data;
        if (user.data === undefined) {
            user.data = {};
        }
        user.data[req.body.date] = req.body.data;

        var calculated = processRawData(req.body.data);
        user.save(function (err){
            if (err) res.send(err);

            res.json(user);
        });
    });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
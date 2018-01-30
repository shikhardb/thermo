const express = require('express');
const app = express();
const path = require('path');
const CronJob = require('cron').CronJob;
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/thermo');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('we are connected!');
});

// create temperature schema
var tempSchema = mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    deviceSerialNumber  : String,
    temperature  : Number
});

// create mongoose model object
var Temperature = mongoose.model('Temperature', tempSchema);


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => res.render('index'));

// start cron job
// new CronJob('0,5,10,15,20,25,30,35,40,45,50,55 * * * * *', function () {
//     console.log('You will see this message every 5 seconds');
// }, null, true, 'America/Los_Angeles');

app.listen(3000, () => console.log('App listening on port 3000!'));
// Require modules
const express = require('express');
const path = require('path');
const CronJob = require('cron').CronJob;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

//use middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// connect to the database
mongoose.connect('mongodb://localhost/thermo');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('we are connected!');
});

// create temperature schema
const tempSchema = mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    deviceSerialNumber: String,
    temperature: Number
});

// create mongoose model object
var Temperature = mongoose.model('Temperature', tempSchema);

function saveTemp(data) {

    var tempdata = new Temperature({
        deviceSerialNumber: data.device,
        temperature: data.temperature
    })

    tempdata.save(function(err, res) {
        if(err) { return false; }
        else { return true; }
    })
}


app.get('/', (req, res) => res.render('index'));

app.post('/', function (req, res) {
    let result = saveTemp(req.body);
    if(result === true) {
        res.status(200).send('Cool');
    } else {
        res.status(500).send('Oops');
    }
});

// start cron job
new CronJob('0,5,10,15,20,25,30,35,40,45,50,55 * * * * *', function () {
    let dummyDevices = ['Thermometer', 'Battery', 'Radiator'];
    let randomTemp = Math.ceil(Math.random()*100);
    let randomDevice = Math.floor(Math.random()*3);

    let mumble = { "device" :  dummyDevices[randomDevice], "temperature" : randomTemp}

    // save a new data every 5 seconds
    saveTemp(mumble);

 }, null, true, 'America/Los_Angeles');


app.listen(3000, () => console.log('App listening on port 3000!'));
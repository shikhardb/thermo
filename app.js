// Require modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

//use middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// create temperature schema

// get home page
app.get('/', (req, res) => res.render('index'));



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// start cron job
// new CronJob('0,5,10,15,20,25,30,35,40,45,50,55 * * * * *', function () {
//     let dummyDevices = ['Thermometer', 'Battery', 'Radiator'];
//     let randomTemp = Math.ceil(Math.random()*100);
//     let randomDevice = Math.floor(Math.random()*3);
    
//     let randomDt = randomDate(new Date(2017, 0, 1), new Date());

//     let mumble = { "device" :  dummyDevices[randomDevice], "temperature" : randomTemp, "timestamp" : randomDt}

//     // save a new data every 5 seconds
//     saveTemp(mumble);

//  }, null, true, 'America/Los_Angeles');


app.listen(3000, () => console.log('App listening on port 3000'));

var path = require('path');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var db = require('../data/index');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/', function(req, res) {

  console.log('Starting POST request...');

  var options = {
    method: 'GET',
    url: 'https://launchlibrary.net/1.2/launch/next/5',
    headers: {
      'User-Agent': req.headers['user-agent']
    }
  }

  request(options, function(err, response, body) {

    console.log('Calling Launch Library API...');

    if (err) {
      console.log('Error in Launch Library GET request: ', err);
      throw err;
    }

    var data = JSON.parse(body).launches;

    for (var i = 0; i < data.length; i++) {

      var videourl = data[i].vidURLs[0] || null;

      var launchInstance = new db({
        name: data[i].name,
        starttime: data[i].windowstart,
        videourl: videourl,
        location: data[i].location.pads[0].name,
        agency: data[i].rocket.agencies.name,
        description: data[i].missions.description
      })

      launchInstance.save(function(err) {
        if (err) {
          console.log('Error in saving to database: ', err);
        }
      });
    }

    res.sendStatus(201);
  })
});

app.get('/launches', function(req, res) {

});

app.listen(3000, function() {
  console.log('Listening on 3000...');
});
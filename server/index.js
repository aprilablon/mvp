var path = require('path');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var db = require('../data/index');
var URL = require('url').URL;
var fs = require('fs');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('', function(req, res) {
  AIzaSyB5J6UIl5j3F01QdwCN01ow7BtMY9OqVjY
})

app.post('/launches', function(req, res) {

  console.log('Starting POST request... ', req.body);

  db.remove({}, function(err) {
    if (err) {
      console.log('Failed to drop database');
    }
  })

  var options = {
    method: 'GET',
    url: `https://launchlibrary.net/1.2/launch/${req.body.query}`,
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
      var missions = data[i].missions[0]|| null;

      var embedurl = null;
      if (videourl) {
        var videoObj = new URL(videourl);
        var videoId = videoObj.search.split('=')[1];
        embedurl = 'https://www.youtube.com/embed/' + videoId;
      }

      var description = null;
      if (missions) {
        description = missions.description;
      }

      var mapsQuery = data[i].location.name.replace(', ', ',').replace(', ', ',').split(' ').join('+');

      var map = `https://www.google.com/maps/embed/v1/place?key=AIzaSyB5J6UIl5j3F01QdwCN01ow7BtMY9OqVjY&q=${mapsQuery}`

      var launchInstance = new db({
        name: data[i].name,
        starttime: data[i].windowstart,
        embedurl: embedurl,
        location: data[i].location.name,
        map: map,
        agency: data[i].rocket.agencies[0].name,
        description: description
      })

      launchInstance.save(function(err) {
        if (err) {
          console.log('DUPLICATE ERROR - IGNORE ME');
        }
      });
    }

    res.sendStatus(201);
  })
});

app.get('/launches/falcon', function(req, res) {

  var query = db.find();

  query.sort({ starttime: -1 });

  query.exec(function(err, data) {
    if (err) {
      console.log('Error in reading from database: ', err);
      throw err;
    }
    res.send(data);
  })
});

app.get('/launches/next', function(req, res) {

  var query = db.find();

  query.sort({ starttime: 1 });

  query.exec(function(err, data) {
    if (err) {
      console.log('Error in reading from database: ', err);
      throw err;
    }
    res.send(data);
  })
});

app.get('/styles.css', function(req, res) {
  fs.readFile('styles.css', function(err, data) {
    if (err) {
      console.log('Error in reading CSS file: ', err);
      throw err;
    }
    res.send(data);
  })
});

app.listen(3000, function() {
  console.log('Listening on 3000...');
});
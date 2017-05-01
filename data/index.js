var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/watcher');
var db = mongoose.connection;

var Schema = mongoose.Schema;

var launches = new Schema({
  name: { type: String, unique: true },
  starttime: { type: Date },
  embedurl: { type: String },
  location: { type: String },
  map: { type: String },
  agency: { type: String },
  description: { type: String }
})

var favorites = new Schema({
  name: { type: String, unique: true },
  starttime: { type: Date },
  embedurl: { type: String },
  location: { type: String },
  map: { type: String },
  agency: { type: String },
  description: { type: String }
})

var Launches = mongoose.model('launches', launches);
var Favorites = mongoose.model('favorites', favorites);

module.exports.launches = Launches;
module.exports.favorites = Favorites;
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/watcher');
var db = mongoose.connection;

var Schema = mongoose.Schema;

var launches = new Schema({
  name: { type: String, unique: true },
  starttime: { type: Date },
  videourl: { type: String },
  location: { type: String },
  agency: { type: String },
  description: { type: String }
})

var Launches = mongoose.model('launches', launches);

module.exports = Launches;
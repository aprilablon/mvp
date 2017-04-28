var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var launches = new Schema({
  name: { type: String, index: { unique: true, dropDups: true } },
  starttime: { type: Date },
  videourl: { type: String },
  location: { type: String },
  agency: { type: String },
  description: { type: String }
})

var Launches = mongoose.model('launches', launches);

module.exports = Launches;
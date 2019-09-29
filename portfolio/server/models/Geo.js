const mongoose = require('mongoose')

const GeoSchema = new mongoose.Schema({
  range: [ Number, Number ],
  country: String,
  region: String,
  eu: String,
  timezone: String,
  city: String,
  ll: [ Number, Number ],
  metro: Number,
  area: Number,
  emoji: String,
  visited: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Geo', GeoSchema)

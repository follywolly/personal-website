const geoip = require('geoip-lite')
const GeoModel = require('./models/Geo.js')

const post = {
  note(req, res, next) {
    const loc = geoip.lookup('145.28.156.110')
    loc.emoji = req.body.emoji
    const geo = new GeoModel(loc)
    geo.save()
      .then(() => {
        res.status(200).end()
      })
      .catch(e => {
        res.status(500).end()
      })
  }
}

module.exports = post

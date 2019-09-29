const geoip = require('geoip-lite')
const GeoModel = require('./models/Geo.js')

const save = {
  ip(req, res, next) {
    // req.ip
    const loc = geoip.lookup('145.28.156.110')
    const geo = new GeoModel(loc)
    geo.save()
      .then(() => {
        console.log('success');
      })
      .catch(err => {
        console.log(err);
      })
    next()
  }
}

module.exports = save

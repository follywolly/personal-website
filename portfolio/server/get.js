const GeoModel = require('./models/Geo.js')

const get = {
  geos(req,res,next) {
    GeoModel.find()
      .then(geos => {
        res.send(geos)
      })
  }
}
module.exports = get

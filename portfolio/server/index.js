const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
// const save = require('./save.js')
// const get = require('./get.js')
// const post = require('./post.js')
// const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
// require('dotenv').config()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  // app.use(bodyParser.json())
  // app.get('/', save.ip)
  // app.get('/geos', get.geos)
  // app.post('/note', post.note)
  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
// const database = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@portfolio-0itkc.mongodb.net/portfolio?retryWrites=true&w=majority`
// mongoose
//   .connect(database, {useNewUrlParser: true})
//   .then(() => {
//     start()
//   })
//   .catch(e => {
//     throw e
//   })

start()

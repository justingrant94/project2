

import express from 'express'
import mongoose from 'mongoose'

const MONGODB_CONNECTION_STRING = 'mongodb://127.0.0.1:27017/worthy'

const PORT = 5010

const startServer = async () => {

  const app = express()

  const logger = (req, res, next) => {
    console.log(`Incoming request on ${req.method} - ${req.url}`)
    next()
  }

  app.use(logger)

  app.get('/', (req, res) => {
    return res.end('Worthy api')
  })
  await mongoose.connect(MONGODB_CONNECTION_STRING)
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`))

}

startServer()
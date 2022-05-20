import express from 'express'
import mongoose from 'mongoose'
import router from './config/router.js'
import { PORT, MONGODB_CONNECTION_STRING } from './config/enviroment.js'

const logger = (req, res, next) => {
  console.log(`Incoming request on ${req.method} - ${req.url}`)
  next()
}

const startServer = async () => {

  const app = express()

  app.use(express.json())
  app.use(logger)
  app.use(router)
  

  await mongoose.connect(MONGODB_CONNECTION_STRING)
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`))

}

startServer()
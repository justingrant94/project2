import express from 'express'
import mongoose from 'mongoose'
import Items from './models/items.js'

const MONGODB_CONNECTION_STRING = 'mongodb://127.0.0.1:27017/worthy'

const PORT = 5010

const startServer = async () => {

  const app = express()
  app.use(express.json())

  const logger = (req, res, next) => {
    console.log(`Incoming request on ${req.method} - ${req.url}`)
    next()
  }

  app.use(logger)

  app.get('/', (req, res) => {
    return res.end('Worthy api')
  })

  app.get('/items', async (req, res) => {
    const items = await Items.find()
    console.log({items})
    return res.status(200).json(items)
  })

  app.post('/items', async (req, res) => {
  const { body: newItem } = req
  console.log(req.body, 'req.body')
  const addedItem = await Items.create(newItem)
  return res.status(200).json(addedItem)
  })

  // app.post('/items', async (req, res) => {
  //   const { body: newListOfItems } = req
  //   newListOfItems.forEach(item => await Items.create(item))
  //   return res.status(200).json(newListOfItems)
  //   })

  await mongoose.connect(MONGODB_CONNECTION_STRING)
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`))

}

startServer()
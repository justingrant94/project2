import mongoose from "mongoose"
import Items from '../models/items.js'
import { MONGODB_CONNECTION_STRING } from "../config/enviroment.js"
import itemsData from './data/items.js'


const seedDatabase = async () => {
  try {
    //Connecting to the database
    await mongoose.connect(MONGODB_CONNECTION_STRING)
    console.log('Database has been connected')
  
    //Removing all the data from the database
    await mongoose.connection.db.dropDatabase()
    console.log('Dropdatabase')


    // Add seed data back in
    const itemsAdded = await Items.create(itemsData)
    console.log(`🌿 Database seeded with ${itemsAdded} items`)
  
    //Close the connection to the database
    await mongoose.connection.close()
    console.log('Database has been disconnected')
  
  
  } catch (err) {
    
    console.log('Something went wrong')
    console.log(err)
  }
}

seedDatabase()
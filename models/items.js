import mongoose from 'mongoose'
import mongooseUniqueValidator from "mongoose-unique-validator"

const itemsSchema = new mongoose.Schema({
  
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  value: { type: Number, required: true },
  category: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

itemsSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('Items', itemsSchema)
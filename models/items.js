import mongoose from 'mongoose'
import mongooseUniqueValidator from "mongoose-unique-validator"

const itemsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

itemsSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('Items', itemsSchema)
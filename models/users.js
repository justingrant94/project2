import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import mongooseUniqueValidator from 'mongoose-unique-validator'
//Fields required
// Name
// Email
// Salary
// Savings
// Password
// passwordConirmation

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlenght: 50 },
  email: { type: String, required: true, unique: true },
  salary: { type: Number, required: true, maxlength: 12 },
  savings: { type: Number, required: true, maxlenght: 12 },
  image: { type: String },
  password: { type: String, required: true },
})

userSchema
  .virtual('passwordConfirmation')
  .set(function(value){
    this._passwordConfirmation = value
  })

userSchema
  .pre('validate', function(next){

    if ( this.isModified('password') && this.password !== this._passwordConfirmation){

      this.invalidate('passwordConfirmation', 'does not match the password field')
    }
    next()
  })

userSchema
  .pre('save', function(next){

    if(this.isModified('password')){

      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

userSchema.methods.validatePassword = function(plainPassword){
  return bcrypt.compareSync(plainPassword, this.password)
    }
    
  userSchema.plugin(mongooseUniqueValidator)
  export default mongoose.model('User', userSchema)
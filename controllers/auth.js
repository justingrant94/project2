import User from '../models/users.js'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config/enviroment.js'


// RegisterUser
export const registerUser = async (req, res) => {
  try {
    console.log(req.body)

    const newUser = await User.create(req.body)
    return res.status(200).json({ message: `Welcome ${newUser.name}` })
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }
}




//Login 
//Method Post
// Log in user by checking that the password matches the email



export const loginUser = async (req, res) => {
  try {
    console.log('user details ->', req.body)
    const { email, password } = req.body
    // Need to check to see if a user exists with the same email passed in the login request
    const userToLogin = await User.findOne({ email: email})
    console.log('userToLogin ->', userToLogin)

    if(!userToLogin || !userToLogin.validatePassword(password)){
      throw new Error()
    }

    const token = jwt.sign({ sub: userToLogin._id}, SECRET, { expiresIn: '5h' })
    console.log('Token ->', token)

    return res.status(200).json({ message: `Welcome back ${userToLogin.name}!`, token: token})
  } catch (err) {
    console.log(err)
    return res.status(422).json({ message: 'Unauthorised'})
  }
  
}

import jwt from 'jsonwebtoken'
import { SECRET } from './enviroment.js'
import User from '../models/users.js'


export const secureRoute = async (req, res, next) => {
  console.log('Hit the secure route')
  try {
    // 1.) Check to see if an authorization header exists, if it doesnt throw an error
    console.log('Headers', req.headers)
    if (!req.headers.authorization) throw new Error('Missing header')

    //2.) Remove Bearer from the beginning of the token, this will allow us to decode it.
    const token = req.headers.authorization.replace('Bearer ', '')
    console.log('token ->', token)

    //Verifying the token using a method provided by jwt
    //First argument is the token
    // Second argument is the secret

    const payload = jwt.verify(token, SECRET)
    console.log('payload ->', payload)
    //The token is valid but need to make sure it exists
    const userToVerify = await User.findById(payload.sub)

    if (!userToVerify) throw new Error('User not found')

    next()

  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Unauthorised'})
  }
}
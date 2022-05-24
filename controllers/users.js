import User from '../models/users.js'
//Method Get
//Endpoint profile
// Get users profile information with created and basket

export const getProfile = async (req, res) => {
  try {
    
    const profile = await User.findById(req.verifiedUser._id).populate('createdItems')
    if (!profile) throw new Error('User not found')
    return res.status(200).json(profile)
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Unauthorised'})
  }
  }

export const showUsers = async (req, res) => {
  const users = await User.find()
  console.log({ users })
  return res.status(200).json(users)
}

export const oneUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found'})
    } 
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Something went wrong'})
  }
}
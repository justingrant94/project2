import User from '../models/users.js'

export const addBasketItems = async (req, res) => {
  const { id } = req.params
  console.log('id ->', id)

  try {
    // console.log(User.findById(id))
    const userToUpdate = await User.findById(id)
    console.log('user to update', userToUpdate)
    
    //Create an item in a basket with an owner

    const basketWithOwner = { ...req.body, owner: req.verifiedUser._id }
    console.log('basket to update ->', basketWithOwner)
    
    // console.log('basket ->', userToUpdate)
    
    //Add basketWithOwner
    userToUpdate.basket.push(basketWithOwner)
    console.log('basket ->', userToUpdate)
    //console.log('Item Id ->', itemId)

    //Save
    await userToUpdate.save()


    return res.status(200).json(basketWithOwner)
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }
}
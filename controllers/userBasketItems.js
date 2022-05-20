import User from '../models/users.js'

//Method Add Basket Items
// /items/:id/basket

export const addBasketItems = async (req, res) => {
  const { id } = req.params
  console.log('id ->', id)

  try {
    // console.log(User.findById(id))
    const userToUpdate = await User.findById(id)
    console.log('user to update', userToUpdate)
    
    //Create an item in a basket with an owner
    const basketItem = { ...req.body }
    // const basketWithOwner = { ...req.body, owner: req.verifiedUser._id }
    console.log('basket to update ->', basketItem )
    
    // console.log('basket ->', userToUpdate)
    
    //Add basketWithOwner
    userToUpdate.basket.push(basketItem)
    console.log('user ->', userToUpdate)
    //console.log('Item Id ->', itemId)

    //Save
    await userToUpdate.save()


    return res.status(200).json(basketItem)
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }
}

//Method remove items from basket 
// users/:id/basket/:basketId
export const removeBasketItem = async (req, res) => {
  const { userId, basketItemId } = req.params
  try {
    const user = await User.findById(userId)
    if (!user) throw new Error('Not found')
    // console.log(user)

    //get basket to delete
    const basketItemToDelete = user.basket.id(basketItemId)
    console.log('basketItemToDelete', basketItemToDelete.itemId)

    
    // const basketItemToDelete = User.basket.findOneAndDelete({itemId: basketItemId})
  
    if (!basketItemToDelete) throw new Error('Basket item not found!')
    console.log('Basket item to delete ->', basketItemToDelete)
    // If the verifiedUser is the owner of the basket item then we can delete it
    // Here we'll check to see if they are


    // console.log('Verified user ---->', req.verifiedUser._id)
    // console.log('Basket item to delete ->', basketItemToDelete)
    
    //This
    if (!basketItemToDelete.owner.equals(req.verifiedUser._id)) throw new Error('unauthorised')
    

    // First we'll need to remove the sibdocument from the basket array
    await basketItemToDelete.remove()

    //Secondly we'll need to save the document
    await user.save()

    return res.sendStatus(204)



    // console.log(user.basket)
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'unauthorised' })
  }
}
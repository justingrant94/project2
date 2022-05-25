import User from '../models/users.js'
import mongoose from 'mongoose'

//Method Add Basket Items
// /items/:id/basket

export const addBasketItems = async (req, res) => {
  const { id } = req.params


  try {
    // console.log(User.findById(id))
    const userToUpdate = await User.findById(id)
    // console.log('user to update', userToUpdate)

    //Create an item in a basket with an owner
    
    const basketItem = { ...req.body }
    
    // Set new item to be true so that if it is we can push it later
    // If the new item is not true we can use it in our forEach loop to increment the quantity by 1
    let newItem = true;

    console.log('basket item to update ->', basketItem)
    // console.log(basketItem.itemId, userToUpdate.basket)
    userToUpdate.basket.forEach(element => {
      // console.log('element', element.itemId.toHexString());
      if(element.itemId.toHexString() === basketItem.itemId){

        element.quantity += 1
        console.log('quantity', basketItem.quantity);
        newItem = false;
        // console.log('already in basket');
      }
    });


    if(newItem === true) {
      userToUpdate.basket.push(basketItem)
    }
  
    
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

    //get basket to delete
    const basketItemToDelete = user.basket.id(basketItemId)
    console.log('basketItemToDelete', basketItemToDelete.itemId)
  
    if (!basketItemToDelete) throw new Error('Basket item not found!')
    console.log('Basket item to delete ->', basketItemToDelete)
    // If the verifiedUser is the owner of the basket item then we can delete it
    // Here we'll check to see if they are
  
    // if (!basketItemToDelete.owner.equals(req.verifiedUser._id)) throw new Error('unauthorised')
    console.log('basket item to update ->', basketItemToDelete.itemId)
    //Go through each documents itemId and convert the ObjectId into a string with toHexString
    //Check if the element itemId is equal to the basketItem itemId
    // If it is decrease the quantity by 1
    user.basket.forEach(element => {
  
      if(element.itemId.toHexString() === basketItemToDelete.itemId.toHexString()){

        element.quantity -= 1
        console.log('quantity', basketItemToDelete.quantity)
  
      }
    })
    // If the basketItemToDeletes quantity is eqaul to 0 remove the item from the basket all together
    if(basketItemToDelete.quantity === 0) {
      await basketItemToDelete.remove()
    }
    //Secondly we'll need to save the document
    await user.save()

    return res.sendStatus(204)


  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'unauthorised' })
  }
}
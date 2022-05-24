import User from '../models/users.js'
import mongoose from 'mongoose'

export const getBasketItems = async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId)
    const basketItems = user.basket
    console.log({basketItems})
    return res.status(200).json(basketItems)
  } catch (error) {
    console.log(error)
    return res.status(404).json(error)
  }
}


//Method Add Basket Items
// /items/:id/basket

export const addBasketItems = async (req, res) => {
  const { userId } = req.params
  try {
    const userToUpdate = await User.findById(userId)
    //Create an item in a basket with an owner
    const basketItem = { ...req.body }
    // Set new item to be true so that if it is we can push it later
    // If the new item is not true we can use it in our forEach loop to increment the quantity by 1
    let newItem = true;
    console.log('basket item to update ->', basketItem)
    userToUpdate.basket.forEach(element => {
      if (element.itemId.toHexString() === basketItem.itemId) {
        element.quantity += basketItem.quantity
        console.log('quantity', basketItem.quantity);
        newItem = false;
      }
    });

    if (newItem === true) userToUpdate.basket.push(basketItem)

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

    // const basketItemToDelete = await user.basket.find({owner: userId, 'basket.itemId': basketItemId })

    //get basket to delete
    user.basket.forEach(async (element) => {
      if (element.itemId.toHexString() === basketItemId) {
        element.quantity--
        console.log('quantity', element.quantity);

        if (element.quantity < 1) {
          await element.remove()
        }

        if (!element.owner.equals(req.verifiedUser._id)) throw new Error('unauthorised')
        console.log('basket item to update ->', element.itemId)
      }
    });

    await user.save()

    return res.sendStatus(204)

  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'unauthorised' })
  }
}
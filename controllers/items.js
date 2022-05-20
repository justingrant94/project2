import Items from '../models/items.js'

export const showItems = async (req, res) => {
  const items = await Items.find()
  console.log({items})
  return res.status(200).json(items)
}

export const getOneItem = async (req, res) => {
  const { id } = req.params
  try {
    const item = await Items.findById(id).populate('owner')
    if (!item) {
      return res.status(404).json({ message: 'Item not found'})
    }
    return res.status(200).json(item)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Something went wrong!'})
  }
}


export const updateItem = async (req, res) => {
  const { id } = req.params
  const { body: editItem, verifiedUser } = req
  try {
    const updatedItem = await Items.findById(id)
    console.log('verified-user', verifiedUser._id)
    console.log('document owner', updatedItem.owner)
    // console.log(updatedItem)
    // const updatedItem = await Items.findByIdAndUpdate(id, editItem, { new: true })
    
    if (!updatedItem.owner.equals(verifiedUser._id)) throw new Error('Unauthorised')

    console.log('owners match')
    //Update the document
    // This
    // Object.assign(updatedItem, editItem)
    Object.assign(updatedItem, editItem)

    await updatedItem.save()
    // //Save the document
    // This
    // await updatedItem.save()
    
    if (!updatedItem){
      return res.status(404).json({
        message: 'Tapas not found'
      })
    }
    return res.status(200).json(updatedItem)
  } catch (err) {
    console.log('ERRRR ==>', err)
    return res.status(404).json(err)
  }
}

export const addItem = async (req, res) => {
  const { body: newItem, verifiedUser } = req
  try {
    console.log('req.body ->', newItem)
    const addedItem = await Items.create({ ...newItem, owner: verifiedUser._id})
    return res.status(200).json(addedItem)
  } catch (error) {
    console.log('Cant add this item')
    console.log(error)
    return res.status(400).json(error.name)
  }
  }

export const deleteItem = async (req, res) => {
  const { id } = req.params
  try {

    const itemToDelete = await Items.findById(id)
 
    console.log('verified-user', req.verifiedUser._id)
    console.log('document owner', itemToDelete.owner)
   
    if (!itemToDelete.owner.equals(req.verifiedUser._id)){
      console.log('Failed at owner check')
      throw new Error('Unauthorised')
    }

    await itemToDelete.remove()

    return res.sendStatus(204)
  } catch (err) {
    return res.status(404).json(err)
  }
}

import Items from '../models/items.js'

export const showItems = async (req, res) => {
  const items = await Items.find()
  console.log({items})
  return res.status(200).json(items)
}

export const getOneItem = async (req, res) => {
  const { id } = req.params
  try {
    const item = await Items.findById(id)
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
  const { body: editItem } = req
  try {
    const updatedItem = await Items.findByIdAndUpdate(id, editItem, { new: true })
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
  const { body: newItem } = req
  console.log(req.body, 'req.body')
  const addedItem = await Items.create(newItem)
  return res.status(200).json(addedItem)
  }

export const deleteItem = async (req, res) => {
  const { id } = req.params
  try {
    await Items.findByIdAndRemove(id)
    return res.status(204).json({ message: 'Item has been deleted!'})
  } catch (err) {
    return res.status(404).json(err)
  }
}

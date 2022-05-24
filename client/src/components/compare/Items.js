
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'


const Items = () => {
  useEffect(() => {
    const getData = async () => {
<<<<<<< HEAD:client/src/components/compare/Items.js
      const { data } = await axios.get('/api/items')
=======
      const { data } = await axios.get('/items')
      console.log(data)
>>>>>>> ec7490c731d9c694f4a43ebc5f1416258746a46b:client/src/components/fortunefourhundred/Items.js
    }
    getData()
  })
}
export default Items


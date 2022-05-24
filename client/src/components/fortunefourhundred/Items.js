
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'


const Items = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/items')
      console.log(data)
    }
    getData()
  })
}
export default Items


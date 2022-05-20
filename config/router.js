import express from "express"
import { registerUser, loginUser } from "../controllers/auth.js"
import { showItems, addItem, getOneItem, deleteItem, updateItem } from "../controllers/items.js"
import { secureRoute } from "./secureRoute.js"

const router = express.Router()

router.route('/items')
  .get(showItems)
  .post(secureRoute, addItem)

router.route('/items/:id')
  .put(secureRoute, updateItem)
  .delete(secureRoute, deleteItem)
  .get(getOneItem)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

export default router
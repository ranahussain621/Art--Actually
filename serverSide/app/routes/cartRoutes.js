'use strict'

const express = require('express')
const router = express.Router()
const { addItemCart, getCart, delteItemFromCart } = require('../controllers/cartController')
const { isAuthenticatedUser, authenticateToken } = require('../middlewares/authMiddlewares')

router.route('/add-item-in-cart').post(addItemCart)
router.route('/get-user-cart').post(getCart)
router.route('/delete-item-user-cart').post(delteItemFromCart)


module.exports = router;
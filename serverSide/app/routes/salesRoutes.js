'use strict'

const express = require('express')
const router = express.Router()
const { addSale, getOrders, getUserOrders } = require('../controllers/salesControllers')
const { isAuthenticatedUser, authenticateToken } = require('../middlewares/authMiddlewares')

router.route('/place-order').post(addSale)
router.route('/get-user-orders').post(getUserOrders)
router.route('/get-all-orders').get(getOrders)


module.exports = router;
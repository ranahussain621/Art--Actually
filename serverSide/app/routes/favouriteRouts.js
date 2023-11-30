// favouriteRouts.js
'use strict'

const express = require('express')
const router = express.Router()
const { addItemFavourite, getFavourite, delteItemFromFavourite } = require('../controllers/favouriteController')
const { isAuthenticatedUser, authenticateToken } = require('../middlewares/authMiddlewares')

router.route('/add-item-in-favourite').post(addItemFavourite)
router.route('/get-user-favourite').post(getFavourite)
router.route('/delete-item-user-favourite').post(delteItemFromFavourite)


module.exports = router;
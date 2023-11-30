'use strict'

const express = require('express');
const { addCollection, getCollection, getSingleCollection,addtoFavorite, adToUnFavorite, deleteCollection } = require('../controllers/collectionControllers');
const router = express.Router()

router.route('/add-collection').post(addCollection)
router.route('/get-collection').get(getCollection)
router.route('/get-single-collection/:id').get(getSingleCollection)
router.route('/add-to-favorite').post(addtoFavorite)
router.route('/add-to-un-favorite').post(adToUnFavorite)
router.route('/delete-collection/:id').delete(deleteCollection)



module.exports = router;
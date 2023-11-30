'use strict'

const express = require('express')
const router = express.Router()
const {visibilitySound} = require('../controllers/visibiltyController')


router.route('/add-sound-visibility').post(visibilitySound)


module.exports = router;
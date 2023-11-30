'use strict'

const express = require('express')
const { accountDetail } = require('../controllers/userAccountDetailController')
const router = express.Router()



router.route('/').post(accountDetail)
module.exports = router;
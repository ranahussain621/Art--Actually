'use strict'

const express = require('express')
const router = express.Router()
const { sendMessage,getChats ,getChatdetails} = require('../controllers/MessagesConller')
const { isAuthenticatedUser, authenticateToken } = require('../middlewares/authMiddlewares')

router.route('/send-message').post(sendMessage)
router.route('/get-chats').post(getChats)
router.route('/get-chat-details').post(getChatdetails)


module.exports = router;
'use strict'

const express = require('express');
const { addNote, getUserNote } = require('../controllers/thankyouController');
const router = express.Router()

router.route('/add-note').post(addNote)
router.route('/get-user-note/:id').get(getUserNote)




module.exports = router;
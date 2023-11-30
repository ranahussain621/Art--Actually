'use strict'

const express = require('express')
const router = express.Router()
const {addEvent,getEventDetails,getEvents,deleteEvent,updateEvent,updateStatusEvent} = require('../controllers/eventController')


router.route('/add-event').post(addEvent)
router.route('/get-event-details').post(getEventDetails)
router.route('/events').post(getEvents)
router.route('/delete-event').post(deleteEvent)
router.route('/update-event').post(updateEvent)
router.route('/update-status-event').post(updateStatusEvent)


module.exports = router;
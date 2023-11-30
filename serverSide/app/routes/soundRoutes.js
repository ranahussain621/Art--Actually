'use strict'

const express = require('express')
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router()
const mediaController = require("../controllers/soundController");
const upload = require('../utils/multerConfig')
const { addSound, getSound, getUserSound, addSoundFormat, addSoundStyle, getSoundFormat, getSoundStyle, 
    deletesounds,updateSound,downloadSound,downloadSounds,fetchSounds,soundDetails } = require('../controllers/soundController')
const { isAuthenticatedUser, authenticateToken } = require('../middlewares/authMiddlewares')


router.route('/get-user-sound').post(getUserSound)
router.route('/add-sound-formates').post(addSoundFormat)
router.route('/add-sound-style').post(addSoundStyle)
router.route('/get-all-sound-formates').get(getSoundFormat)
router.route('/get-all-sound-style').get(getSoundStyle)
router.route('/get-all-sounds').get(getSound)
router.route('/delete-sounds').post(deletesounds)
// router.route('/sounds/:id/download').get(downloadSound) // dummy api for testing purpose
router.route('/sounds/download').post(downloadSounds)
router.route('/get-sounds').post(fetchSounds)
router.route('/sound-details').post(soundDetails)



//post create new media
router.post(
    "/add-sound",
    upload.fields([
        {
            name: "file",
            maxCount: 5,
        },
        {
            name: "image",
            maxCount: 5,
        },
    ]),
    mediaController.addSound
);
router.post(
    "/update-sounds",
    upload.fields([{
        name: "file",
        maxCount: 5,
    }, 
    {
        name: "image",
        maxCount: 5,
    },
]),
    mediaController.updateSound
);
module.exports = router;
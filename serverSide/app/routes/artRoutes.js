'use strict'

const express = require('express')
const router = express.Router()
const {getArt, getUserArt, addFormat, addStyle, getFormat, getStyle,getArtDetails, addArt,updateArt,deletearts } = require('../controllers/artController')
const { isAuthenticatedUser, authenticateToken } = require('../middlewares/authMiddlewares')
const upload = require('../utils/multerConfig')


router.post(
    "/add-art",
    upload.fields([
        {
            name: "image",
            maxCount: 5,
        },
    ]),
    addArt
);

router.route('/get-arts').post(getArt)
router.route('/get-user-arts').post(getUserArt)
router.route('/add-format').post(addFormat)
router.route('/add-style').post(addStyle)
router.route('/get-format').get(getFormat)
router.route('/get-style').get(getStyle)
router.route('/get-art-details').post(getArtDetails)
router.route('/delete-arts').post(deletearts)

// 
router.post(
    "/update-art",
    upload.fields([
        {
            name: "image",
            maxCount: 5,
        },
    ]),
    updateArt
);

module.exports = router;
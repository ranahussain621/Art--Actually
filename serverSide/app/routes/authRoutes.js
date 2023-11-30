'use strict'

const express = require('express')
const router = express.Router()
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const authController = require("../controllers/userControllers");
const upload = require('../utils/multerConfig')


const { signup, login, accountVerify, users, changePassword, userDetails, userUpdate, forgetLink, updatePassword, forgetPassword,
     blockUsers, unBlockUsers, allUsers, deleteUser,userDelete,addUserCard,getUserCards,getUserCardDetails,deleteUserCard } = require('../controllers/userControllers')
const { isAuthenticatedUser, authenticateToken } = require('../middlewares/authMiddlewares')


// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         if (!fs.existsSync("images")) {
//             fs.mkdirSync("images");
//         }

//         if (!fs.existsSync("images")) {
//             fs.mkdirSync("images");
//         }

//         cb(null, "images");
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now()+".png");
//     },
// });

// const upload = multer({
//     storage: storage,
//     fileFilter: function(req, file, cb) {
//         var ext = path.extname(file.originalname);

//         if (ext !== ".jpeg" && ext !== ".jpg" && ext !== ".png") {
//             return cb(new Error("Only jpeg,jpg,png are allowed!"));
//         }

//         cb(null, true);
//     },
// });

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/verify-account').get(accountVerify)
router.route('/forget-password').get(forgetPassword)
router.route('/changePassword').post(changePassword)
router.route('/user-details').post(userDetails)
// router.route('/user-update').post(userUpdate)
router.route('/user-forget-link').post(forgetLink)
router.route('/users').get(users)
router.route('/user-delete').post(userDelete)


router.route('/add-user-card').post(addUserCard)
router.route('/get-user-cards').post(getUserCards)
router.route('/get-card-details').post(getUserCardDetails)
router.route('/delete-user-card').post(deleteUserCard)

router.put(
    "/user-update",
    upload.fields([{
        name: "image",
        maxCount: 5,
    }, ]),
    authController.userUpdate
);

module.exports = router;
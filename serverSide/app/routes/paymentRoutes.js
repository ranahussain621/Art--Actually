'use strict'

const express = require('express')
const router = express.Router()
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { 
    addPayment,getAllPayment,getPaymentDetails,requestPayout,sendPayout,allPayout
} = require('../controllers/paymentController')

const paymentController = require("../controllers/paymentController");


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (!fs.existsSync("receipts")) {
            fs.mkdirSync("receipts");
        }

        if (!fs.existsSync("receipts")) {
            fs.mkdirSync("receipts");
        }

        cb(null, "receipts");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now()+".png");
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        var ext = path.extname(file.originalname);

        if (ext !== ".png" && ext !== ".jpeg" && ext !== ".jpg"&& ext !== ".pdf") {
            return cb(new Error("Only png,jpeg,jpg,pdf are allowed!"));
        }

        cb(null, true);
    },
});

router.route('/add-payment').post(addPayment)
router.route('/get-all-payments').post(getAllPayment)
router.route('/get-payment-details').post(getPaymentDetails)



router.route('/request-payout').post(requestPayout)
router.route('/all-payout').post(allPayout)

//post create new media
router.post(
    "/send-payout",
    upload.fields([{
        name: "file",
        maxCount: 5,
    }, ]),
    paymentController.sendPayout
);



module.exports = router;
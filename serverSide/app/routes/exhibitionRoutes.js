'use strict'

const express = require('express');
const { create, list, detail, remove, update } = require('../controllers/exhibitionController');
const router = express.Router()
const upload = require('../utils/multerConfig')


router.post(
    "/add-exhibition",
    upload.fields([
        {
            name: "image",
            maxCount: 5,
        },
    ]),
    create
);
router.put(
    "/update-exhibition",
    upload.fields([
        {
            name: "image",
            maxCount: 5,
        },
    ]),
    update
);
router.route('/list-of-exhibition').get(list)
router.route('/detail-of-exhibition').post(detail)
router.route('/delete-exhibition/:id').delete(remove)


module.exports = router;
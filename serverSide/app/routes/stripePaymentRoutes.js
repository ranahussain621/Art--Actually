'use strict'
const express = require('express')
const { prices, createUser, session, customerSub, checkSubscriptionStatus, cancelSubscription, fetchCustomerList, cancelClientSubscription } = require('../controllers/stripePaymentController')
const router = express.Router()


router.route('/prices').get(prices)
router.route('/create-user').post(createUser)
router.route('/create-session').post(session)
router.route('/customer-subscription/:id').get(customerSub)
router.route('/customer-subscription-status/:id').get(checkSubscriptionStatus)
router.route('/cancel-subscription/:id').get(cancelSubscription)
router.route('/fetch-customer-list').get(fetchCustomerList)
router.route('/cancel-user-subscription').post(cancelClientSubscription)




module.exports = router
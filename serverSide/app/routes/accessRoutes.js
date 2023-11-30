'use strict'

const express = require('express')
const router = express.Router()
const { addRole, addPermission, getRoles, getPermission, getAllUsers, assignRolePermission, getUserRole, assignUserRole, blockUser, unblockUser } = require('../controllers/accessController')
const { isAuthenticatedUser, authenticateToken } = require('../middlewares/authMiddlewares')

router.route('/add-role').post(addRole)
router.route('/get-roles').get(authenticateToken, getRoles)
router.route('/assign-user-role').post(assignUserRole)
router.route('/get-user-role').post(getUserRole)
router.route('/bolck-user').post(blockUser)
router.route('/unbolck-user').post(unblockUser)


module.exports = router;
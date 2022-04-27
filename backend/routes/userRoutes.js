const express = require('express')
const router = express.Router();
const {
  createUser, loginToUser, currentUser,
} = require('../controller/userController')
const {protectToken} = require('../middleware/authMiddleware.js')

router.post('/', createUser)
router.post('/login', loginToUser)
router.get('/profile', protectToken, currentUser)

module.exports = router
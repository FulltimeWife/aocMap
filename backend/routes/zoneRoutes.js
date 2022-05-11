const express = require('express')
const router = express.Router();
const {
  createZone
} = require('../controller/zoneController')
const {protectToken} = require('../middleware/authMiddleware.js')

router.post('/map/:id', protectToken, createZone)

module.exports = router
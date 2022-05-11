const express = require('express');
const router = express.Router();
const {
  getMap,
  getMarkerByUser,
  setMapMarker,
  updateMapMarker,
  deleteMapMarker,
  getMarkerByZone
} = require('../controller/mapController')
const {
  createZone
} = require('../controller/zoneController')
const {protectToken} = require('../middleware/authMiddleware')

router.route('/').get(getMap).post(protectToken, setMapMarker)
router.route('/owner').get(protectToken, getMarkerByUser)
router.route('/:id').get(getMarkerByZone).delete(protectToken, deleteMapMarker).put(protectToken, updateMapMarker)
router.route('/zone/').post(protectToken, createZone)

module.exports = router;
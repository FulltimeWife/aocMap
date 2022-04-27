const express = require('express');
const router = express.Router();
const {
  getMap,
  getMarkerByUser,
  setMapMarker,
  updateMapMarker,
  deleteMapMarker
} = require('../controller/mapController')
const {protectToken} = require('../middleware/authMiddleware')

router.route('/').get(getMap).post(protectToken, setMapMarker)
router.route('/owner').get(protectToken, getMarkerByUser)
router.route('/:id').delete(protectToken, deleteMapMarker).put(protectToken, updateMapMarker)

module.exports = router;
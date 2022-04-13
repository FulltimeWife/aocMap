const express = require('express');
const router = express.Router();
const {
  getMap,
  setMapMarker,
  updateMapMarker,
  deleteMapMarker
} = require('../controller/mapController')

router.route('/').get(getMap).post(setMapMarker)
router.route('/:id').delete(deleteMapMarker).put(updateMapMarker)

module.exports = router;
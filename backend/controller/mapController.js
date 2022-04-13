const asyncHandler = require('express-async-handler');

// @desc      GET The map
// @route     GET /api/map
// @access    Private.
const getMap = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'get map'})
})

// @desc      SET a map marker
// @route     SET /api/map
// @access    Private.
const setMapMarker = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Please add a valid text input')
  }
  res.status(200).json({message: 'Set map marker'})
})

// @desc      Update a map marker
// @route     PUT /api/map/:id
// @access    Private.
const updateMapMarker = asyncHandler(async (req, res) => {
  res.status(200).json({message: `Update map marker ${req.params.id}`})
})


// @desc      Delete a map marker
// @route     DELETE /api/map/:id
// @access    Private.
const deleteMapMarker = asyncHandler(async (req, res) => {
  res.status(200).json({message: `Delete map marker ${req.params.id}`})
})

module.exports = {
  getMap,
  setMapMarker,
  updateMapMarker,
  deleteMapMarker,
}
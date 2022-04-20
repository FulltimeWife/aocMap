const asyncHandler = require('express-async-handler');
const MapMarker = require("../models/mapMarkerModel");

const mapMarkerModel = require('../models/mapMarkerModel')

// @desc      GET The map
// @route     GET /api/map
// @access    Public.
const getMap = asyncHandler(async (req, res) => {
  const allMapMarkers = await mapMarkerModel.find()
  res.status(200).json(allMapMarkers)
})

// @desc      SET a map marker
// @route     SET /api/map
// @access    Private.
const setMapMarker = asyncHandler(async (req, res) => {
  if(!req.body.markerName) {
    res.status(400)
    throw new Error('Please add a valid text input')
  }
  const mapMarker = new MapMarker({
    mapMarkerMap: {}
  })
  mapMarker.markerName = req.body.markerName
  mapMarker.mapMarkerMap.set('x', req.body.coordinates.x)
  mapMarker.mapMarkerMap.set('y', req.body.coordinates.y)
  mapMarker.mapMarkerMap.set('z', req.body.coordinates.z)
  mapMarker.save()
  res.status(200).json(mapMarker)
})

// @desc      Update a map marker
// @route     PUT /api/map/:id
// @access    Private.
const updateMapMarker = asyncHandler(async (req, res) => {
  const mapMarker = await MapMarker.findById(req.params.id) 
  console.log(req.body)
  if(!mapMarker) {
    res.status(400)
    throw new Error('Map Marker not found')
  }

  const updatedMapMarker = await MapMarker.findByIdAndUpdate(req.params.id, req.body, 
  {
    new: true
  })
  
  res.status(200).json(updatedMapMarker)

})


// @desc      Delete a map marker
// @route     DELETE /api/map/:id
// @access    Private.
const deleteMapMarker = asyncHandler(async (req, res) => {

  const mapMarker = await MapMarker.findById(req.params.id) 

  if (!mapMarker) {
    res.status(400)
    throw new Error ('Map Marker not found')
  }

  await mapMarker.remove()
  res.status(200).json({id: req.params.id})

})

module.exports = {
  getMap,
  setMapMarker,
  updateMapMarker,
  deleteMapMarker,
}
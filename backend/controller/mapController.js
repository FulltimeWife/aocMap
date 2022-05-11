const asyncHandler = require('express-async-handler');
const MapMarker = require("../models/mapMarkerModel");

const mapMarkerModel = require('../models/mapMarkerModel')
const userTable = require('../models/userModel')

const userRoles = require('../constants/userConstants')

// @desc      GET The map
// @route     GET /api/map
// @access    Public.
const getMap = asyncHandler(async (req, res) => {
  const allMapMarkers = await mapMarkerModel.find()
  res.status(200).json(allMapMarkers)
})

const getMarkerByUser = asyncHandler(async(req, res) => {
  const usersMapMarker = await mapMarkerModel.find({ mapMarkerOwner: req.user.id })
  res.status(200).json(usersMapMarker)
})

const getMarkerByZone = asyncHandler(async(req, res) => {
  const zoneMapMarkers = await(mapMarkerModel.find({ mapMarkerZone: req.body.id}))
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
    coordinates: {},
    mapMarkerOwner: req.user.id
  })
  mapMarker.markerName = req.body.markerName
  mapMarker.mapMarkerZone = req.body.mapMarkerZone
  mapMarker.coordinates.set('x', req.body.coordinates.x)
  mapMarker.coordinates.set('y', req.body.coordinates.y)
  mapMarker.coordinates.set('z', req.body.coordinates.z)
  mapMarker.type = req.body.type
  mapMarker.save()
  res.status(200).json(mapMarker)
})

// @desc      Update a map marker
// @route     PUT /api/map/:id
// @access    Private.
const updateMapMarker = asyncHandler(async (req, res) => {
  const mapMarker = await MapMarker.findById(req.params.id) 
  if(!mapMarker) {
    res.status(400)
    throw new Error('Map Marker not found')
  }

  //Define the user as the one making the request 
  const user = await userTable.findById(req.user.id)

  //If user does not exist, throw an error
  if(!user) {
    res.status(401)
    throw new Error('User is not found')
  }

  if(user.role === userRoles.ADMIN) {
    const updatedMapMarker = await MapMarker.findByIdAndUpdate(req.params.id, req.body, 
      {
        coordinates: req.body.coordinates,
        new: true
      })
      //If the person making the request is NOT equal to the one who owns the map marker, throw an error
  } 
  else if(mapMarker.mapMarkerOwner.toString() !== user.id) {
    res.status(401)
    throw new Error('This is not your map marker')
  }

  const updatedMapMarker = await MapMarker.findByIdAndUpdate(req.params.id, req.body, 
  {
    coordinates: req.body.coordinates,
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

  //Define the user as the one making the request 
  const user = await userTable.findById(req.user.id)

  //If user does not exist, throw an error
  if(!user) {
    res.status(401)
    throw new Error('User is not found')
  }

  if(user.role === userRoles.ADMIN) {
    await mapMarker.remove()
  } 
   //If the person making the request is NOT equal to the one who owns the map marker, throw an error
  else if (mapMarker.mapMarkerOwner.toString() !== user.id) {
    res.status(401)
    throw new Error('This is not your map marker')
  }  
  await mapMarker.remove()
  res.status(200).json({id: req.params.id})
})

module.exports = {
  getMap,
  getMarkerByUser,
  getMarkerByZone,
  setMapMarker,
  updateMapMarker,
  deleteMapMarker,
}
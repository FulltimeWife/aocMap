const asyncHandler = require('express-async-handler');
const zoneTable = require('../models/zoneModel')

// @desc      Create a Zone
// @route     POST /map/zone
// @access    Private
const createZone = asyncHandler(async (req, res) => {
  const {zoneName} = req.body
  if(!zoneName) {
    res.status(400)
    throw new Error('Please enter the name of the zone')
  }
  const checkZone = await zoneTable.findOne({zoneName})

  if(checkZone) {
    res.status(400)
    throw new Error('Zone already exists')
  }

  const newZone = await zoneTable.create({
    zoneName,
    zoneOwner: req.user.id,
    zoneType: req.body.zoneType
  })
  
  if(newZone) {
    res.status(201).json({
      _id: newZone.id,
      zoneName: newZone.zoneName,
      zoneType: req.body.zoneType
    })
  } else {
    res.status(400)
    throw new Error('Invalid zone data')
  }
})

module.exports = {
  createZone,
}
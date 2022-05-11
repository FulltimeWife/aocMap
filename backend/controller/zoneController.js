const asyncHandler = require('express-async-handler');
const zoneTable = require('../models/zoneModel')


// @desc      Create a User
// @route     POST /zone
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
    zoneOwner: req.user.id
  })
  
  if(newZone) {
    res.status(201).json({
      _id: newZone.id,
      zoneName: newZone.zoneName
    })
  } else {
    res.status(400)
    throw new Error('Invalid zone data')
  }
})

module.exports = {
  createZone
}
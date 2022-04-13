const { Decimal128 } = require("bson");
const mongoose = require('mongoose');

const mapMarkerSchema = mongoose.Schema({
  markerName: {
    type: String,
    required: [true, 'Please label this marker']
  },
  xCoordinate: {
    type: Decimal128,
    required: [true, 'Please add an X Coordinate']
  },
  yCoordinate: {
    type: Decimal128,
    required: [true, 'Please add a Y Coordinate']
  },
  zCoordinate: {
    type: Decimal128,
    required: [true, 'Please add a Z Coordinate']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Map Marker Model', mapMarkerSchema)
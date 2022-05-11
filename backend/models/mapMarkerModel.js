const mongoose = require('mongoose');

const mapMarkerSchema = new mongoose.Schema({
  markerName: {
    type: String,
    required: [true, 'Please provide the name of the Map Marker']
  },
  coordinates: {
    type: Map,
    of: Number,
    required: [true, 'Please provide the coordinates']
  },
  mapMarkerOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userTable'
  },
  mapMarkerZone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'zoneTable'
  },
  type: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5, 6],
    default: 0
  }
})

const MapMarker = mongoose.model('mapMarker', mapMarkerSchema);

module.exports = MapMarker
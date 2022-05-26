const mongoose = require('mongoose');

const zoneSchema = mongoose.Schema({
  zoneName: {
    type: String,
    required: [true, 'Please supply the name of the Zone']
  },
  zoneOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userTable'
  },
  zoneType: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5]
  }
})

module.exports = mongoose.model('zoneTable', zoneSchema)
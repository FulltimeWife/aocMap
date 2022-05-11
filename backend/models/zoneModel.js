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
})

module.exports = mongoose.model('zoneTable', zoneSchema)
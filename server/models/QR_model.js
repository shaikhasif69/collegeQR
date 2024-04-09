const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  lab: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lab',
    required: true,
    unique: true
  },
  imageUrl: {
    type: String, // Path to the QR code image
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const QRCode = mongoose.model('QRCode', qrCodeSchema);

module.exports = QRCode;

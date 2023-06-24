const mongoose = require('mongoose');

const seatPricingSchema = new mongoose.Schema({
  seatClass: {
    type: String,
    required: true,
  },
  minPrice: {
    type: Number,
    default: null,
  },
  maxPrice: {
    type: Number,
    default: null,
  },
  normalPrice: {
    type: Number,
    default: null,
  },
});

const SeatPricing = mongoose.model('SeatPricing', seatPricingSchema);

module.exports = SeatPricing;
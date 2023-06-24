const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Seat = require('../models/Seat');

router.post('/', async (req, res) => {
    const { seatIds, userName, phoneNumber } = req.body;
    try {
      const seats = await Seat.find({ _id: { $in: seatIds }, isBooked: false });
      if (seats.length !== seatIds.length) {
        return res.status(400).json({ message: 'One or more seats are already booked' });
      }
      const booking = new Booking({
        seat: seats,
        userName,
        phoneNumber,
      });
      await booking.save();
      seats.forEach(async (seat) => {
        seat.isBooked = true;
        await seat.save();
      });
      res.json({ message: 'Booking created successfully', bookingId: booking._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  router.get('/', async (req, res) => {
    const { userIdentifier } = req.query;
    if (!userIdentifier) {
      return res.status(400).json({ message: 'User identifier is required' });
    }
    try {
      const bookings = await Booking.find({ phoneNumber: userIdentifier });
      res.json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  module.exports = router;
const express = require('express');
const router = express.Router();
const Seat = require('../models/Seat');

router.get('/', async (req, res) => {
    try {
      const seats = await Seat.find().sort({ seatClass: 1 });
      res.json(seats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // GET /seats/:id
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const seat = await Seat.findById(id);
      if (!seat) {
        return res.status(404).json({ message: 'Seat not found' });
      }
      res.json(seat);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  module.exports = router;
  
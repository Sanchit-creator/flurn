const express = require('express');
const router = express.Router();

router.use('/seats', require('./seatRoutes'))
router.use('/bookings', require('./bookingRoutes'))

module.exports = router;
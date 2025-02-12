const express = require('express');
const bookingController = require('../controllers/bookingController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/book', authenticate, bookingController.bookSeat);
router.get('/:bookingId', authenticate, bookingController.getBookingDetails);

module.exports = router;
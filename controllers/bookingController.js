const Booking = require('../models/bookingModel');
const Train = require('../models/trainModel');

exports.bookSeat = async (req, res) => {
    const { trainId, seats } = req.body;
    const userId = req.user.id;
    try {
        await Train.updateAvailableSeats(trainId, seats);
        await Booking.createBooking(userId, trainId, seats);
        res.status(201).json({ message: 'Seat booked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookingDetails = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await Booking.getBookingDetails(bookingId);
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
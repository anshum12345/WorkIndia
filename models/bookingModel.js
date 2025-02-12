const db = require('../config/db');

class Booking {
    static async createBooking(userId, trainId, seatsBooked) {
        const [result] = await db.execute(
            'INSERT INTO bookings (user_id, train_id, seats_booked) VALUES (?, ?, ?)',
            [userId, trainId, seatsBooked]
        );
        return result;
    }

    static async getBookingDetails(bookingId) {
        const [rows] = await db.execute('SELECT * FROM bookings WHERE id = ?', [bookingId]);
        return rows[0];
    }
}

module.exports = Booking;
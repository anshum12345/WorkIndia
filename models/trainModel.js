const db = require('../config/db');

class Train {
  static async createTrain(name, source, destination, totalSeats) {
    const [result] = await db.execute(
        'INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)',
        [name, source, destination, totalSeats, totalSeats]
    );
    return result;
}

    static async findTrainsByRoute(source, destination) {
        const [rows] = await db.execute(
            'SELECT * FROM trains WHERE source = ? AND destination = ?',
            [source, destination]
        );
        return rows;
    }

    static async updateAvailableSeats(trainId, seats) {
        const [result] = await db.execute(
            'UPDATE trains SET available_seats = available_seats - ? WHERE id = ?',
            [seats, trainId]
        );
        return result;
    }
}

module.exports = Train;
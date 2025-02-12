const db = require('../config/db');

class User {
    static async createUser(username, password, role) {
        const [result] = await db.execute(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, password, role]
        );
        return result;
    }

    static async findUserByUsername(username) {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }
}

module.exports = User;
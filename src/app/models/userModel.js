const { getConnection } = require('../../db');

class UserModel {
    static async findUserByCredentials(username, password) {
        try {
            const connection = await getConnection();
            const [rows] = await connection.execute(
                'SELECT id, username, isAdmin FROM users WHERE username = ? AND password = ?',
                [username, password]
            );
            await connection.end();
            return rows.length > 0 ? rows[0] : null; // Return user or null
        } catch (error) {
            throw new Error('Database error during user lookup');
        }
    }
}

module.exports = UserModel;
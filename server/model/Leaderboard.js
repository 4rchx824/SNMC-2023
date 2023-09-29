const pool = require("../config/db");

const leaderboard = {
    Current: async () => {
        let conn;
        try {
            conn = await pool.getConnection();

            let query = `
                SELECT
                *
                FROM
                events
                WHERE current = 1
            `;

            const [rows, cols] = await conn.query(query);

            return rows[0];
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            if (conn) conn.release();
        }
    },
};

module.exports = leaderboard;

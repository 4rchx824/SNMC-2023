const pool = require("../config/db");

const scores = {
    Leaderboard: async (event_id) => {
        let conn;
        try {
            conn = await pool.getConnection();

            let query = `
                SELECT 
                u.uuid, 
                u.name, 
                u.seat, 
                u.organisation, 
                s.score, 
                s.pts_attained 
                FROM scores s, users u 
                WHERE 
                u.uuid = s.uuid 
                AND event_id = ? 
                ORDER BY pts_attained DESC, score DESC, name ASC;
            `;

            let args = [event_id];

            if (event_id === "All") {
                query = `
                SELECT 
                u.uuid, 
                u.name, 
                u.seat, 
                u.organisation, 
                SUM(s.score) as total_score, 
                SUM(s.pts_attained) as total_pts_attained
                FROM scores s, users u 
                WHERE 
                u.uuid = s.uuid 
                GROUP BY u.uuid, u.name, u.seat
                ORDER BY SUM(s.pts_attained) DESC, SUM(s.score) DESC, name ASC;
                `;
                args = [];
            }

            const [rows, cols] = await conn.query(query, args);

            return rows;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            if (conn) conn.release();
        }
    },
    Delete: async (body) => {
        let conn;
        let success = false;
        try {
            let { uuid, event_id } = body;

            conn = await pool.getConnection();

            let query = `
                DELETE FROM scores WHERE uuid = ? AND event_id = ?
            `;
            let args = [uuid, event_id];

            const [rows, cols] = await conn.query(query, args);

            success = true;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            if (conn) conn.release();
        }

        return success;
    },
    Update: async (body) => {
        let conn;
        try {
            let { score, pts_attained, uuid, event_id } = body;

            conn = await pool.getConnection();

            let query = `
                UPDATE
                scores SET
                score = ?, pts_attained = ?
                WHERE
                event_id = ? AND uuid = ?
            `;

            let args = [score, pts_attained, event_id, uuid];

            const [rows, cols] = await conn.query(query, args);

            return {
                score: score,
                pts_attained: pts_attained,
            };
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            if (conn) conn.release();
        }
    },
    Create: async (body) => {
        let conn;
        let status = false;
        try {
            let { score, pts_attained, uuid, event_id } = body;
            score = score ?? 0;
            pts_attained = pts_attained ?? 0;

            conn = await pool.getConnection();

            let preq = `
                SELECT
                *
                FROM
                scores
                WHERE
                uuid = ?
                AND
                event_id = ?
            `;
            let prea = [uuid, event_id];
            const [q1, r1] = await conn.query(preq, prea);

            if (q1.length === 1) throw new Error("Score already exists");

            let query = `
                INSERT INTO
                scores
                (event_id, uuid, score, pts_attained)
                VALUES
                (?, ?, ?, ?)
            `;

            let args = [event_id, uuid, score, pts_attained];

            const [rows, cols] = await conn.query(query, args);

            status = true;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            if (conn) conn.release();
        }
        return status;
    },
};

module.exports = scores;

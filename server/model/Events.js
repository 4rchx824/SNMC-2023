const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const events = {
    findAll: async () => {
        let conn;
        try {
            conn = await pool.getConnection();

            let query = `
                SELECT
                event_id, title
                FROM
                events
                ORDER BY title ASC
            `;

            const [rows, cols] = await conn.query(query);

            return rows;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            if (conn) conn.release();
        }
    },
    findCompetitors: async (event_id) => {
        let conn;
        try {
            conn = await pool.getConnection();

            let query = `
                SELECT
                s.uuid, u.seat, u.name, s.score, s.pts_attained, s.last_updated
                FROM
                scores s, users u
                WHERE s.uuid = u.uuid
                AND s.event_id = ?
                ORDER BY seat ASC
            `;

            const [rows, cols] = await conn.query(query, [event_id]);

            return rows;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            if (conn) conn.release();
        }
    },
    Selections: async () => {
        let conn;
        try {
            conn = await pool.getConnection();

            let query = `
                SELECT
                event_id, title
                FROM
                events
            `;

            const [rows, cols] = await conn.query(query);

            return rows;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            if (conn) conn.release();
        }
    },
    Delete: async (event_id) => {
        let conn;
        let success = false;
        try {
            conn = await pool.getConnection();
            await conn.beginTransaction();

            const deleteFromEvents = () => {
                return new Promise(async (resolve, reject) => {
                    try {
                        await conn.query(
                            "DELETE FROM events WHERE event_id = ?",
                            [event_id]
                        );
                        resolve();
                    } catch (e) {
                        reject(e);
                    }
                });
            };

            const deleteFromScores = () => {
                return new Promise(async (resolve, reject) => {
                    try {
                        await conn.query(
                            "DELETE FROM scores WHERE event_id = ?",
                            [event_id]
                        );
                        resolve();
                    } catch (e) {
                        reject(e);
                    }
                });
            };

            await Promise.all([deleteFromEvents(), deleteFromScores()]);

            await conn.commit();
            success = true;
        } catch (e) {
            console.error(e);
            if (conn) await conn.rollback();
            throw e;
        } finally {
            if (conn) conn.release();
        }
        return success;
    },
    UpdateCurrent: async (event_id) => {
        let conn;
        let success = false;
        try {
            conn = await pool.getConnection();
            await conn.beginTransaction();

            let query = `
                UPDATE events SET current = 0 WHERE current = 1
            `;
            let [rows, cols] = await conn.query(query);

            query = `
            UPDATE events SET current = 1 WHERE event_id = ?
            `;
            let args = [event_id];

            [rows, cols] = await conn.query(query, args);

            if (rows.affectedRows !== 1)
                throw new Error("Failed to update current event");

            await conn.commit();
            success = true;
        } catch (e) {
            await conn.rollback();
            console.error(e);
            throw e;
        } finally {
            if (conn) conn.release();
        }
        return success;
    },
    Update: async (event_id, body) => {
        let conn;
        let success = false;
        try {
            let { title, status } = body;
            conn = await pool.getConnection();

            let query = `
                UPDATE events
                SET title = ?, status = ?
                WHERE event_id =?
            `;
            let args = [title, status, event_id];

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
    Create: async (eventName) => {
        let conn;
        try {
            conn = await pool.getConnection();

            let uuid = uuidv4();
            let query = `
                INSERT INTO events
                (event_id, title, status, current)
                VALUES
                (?, ?, ?, ?)
            `;
            let args = [uuid, eventName, "Upcoming", 0];

            const [rows, cols] = await conn.query(query, args);

            return uuid;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            if (conn) conn.release();
        }
    },
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
    Stats: async () => {
        let conn;
        try {
            conn = await pool.getConnection();

            let query = `
                SELECT
                (
                    SELECT COUNT(DISTINCT(event_id)) as Upcoming FROM events WHERE status = "UPCOMING"
                ) as UPCOMING,
                (
                    SELECT COUNT(DISTINCT(event_id)) as Upcoming FROM events WHERE status = "COMPLETED"
                ) as COMPLETED
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
    findOne: async (event_id) => {
        let conn;
        let event = null;
        try {
            conn = await pool.getConnection();

            let query = `
                SELECT
                *
                FROM
                events
                WHERE
                event_id = ?
            `;

            const [rows, cols] = await conn.query(query, [event_id]);

            if (!!rows[0]) event = rows[0];
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            if (conn) conn.release();
        }

        return event;
    },
    Search: async (name, page, forStats) => {
        let conn;
        try {
            let limit = 5;
            let offset = (page - 1) * limit;
            let like = `%${name}%`;

            conn = await pool.getConnection();

            let query = `
                SELECT
                *
                FROM
                events
                WHERE
                title LIKE ?
                ORDER BY current DESC, title  ASC
                LIMIT ?
                OFFSET ?
            `;

            let args = [like, limit, offset];

            if (forStats) {
                query = `
                SELECT
                COUNT(*) as COUNT
                FROM
                events
                WHERE
                title LIKE ?
                `;

                args = [like];
            }

            const [rows, cols] = await conn.query(query, args);

            if (forStats)
                return {
                    maxPage: Math.ceil(rows[0].COUNT / limit),
                    count: rows[0].COUNT,
                };

            return rows;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            if (conn) conn.release();
        }
    },
};

module.exports = events;

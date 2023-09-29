const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const users = {
    findEligible: async (event_id) => {
        let conn;
        try {
            conn = await pool.getConnection();

            let query = `
                SELECT 
                DISTINCT(u.uuid), 
                u.name 
                FROM 
                users u, 
                scores s 
                WHERE
                u.uuid NOT IN 
                (
                    SELECT 
                    uuid 
                    FROM 
                    scores 
                    WHERE event_id = ?
                )
                AND u.role = "COMPETITOR"
                ORDER BY u.name ASC
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
    Create: async (body) => {
        let conn;
        try {
            conn = await pool.getConnection();

            let { name, email, organisation, seat, role, gender, password } =
                body;
            organisation = organisation ?? "NA";
            gender = gender === "Male" ? "M" : "F";
            seat = seat === "" ? null : seat;
            organisation =
                organisation === ""
                    ? role === "Admin"
                        ? "ORGANISER"
                        : "COMPETITOR"
                    : organisation;
            role = role.toUpperCase();

            let uuid = uuidv4();
            let query = "";
            let args = [];
            if (role === "COMPETITOR") {
                query = `
                    INSERT INTO users
                    (uuid, name, role, organisation, seat, gender)
                    VALUES
                    (?, ?, ?, ?, ?, ?)
                `;
                args = [uuid, name, role, organisation, seat, gender];
            }

            if (role === "ADMIN") {
                query = `
                INSERT INTO users
                (uuid, email, name, password, role, organisation, seat, gender)
                VALUES
                (?, ?, ?, ?, ?, ?, ?, ?)
            `;
                let hashed = await bcrypt.hash(password, 10);

                args = [
                    uuid,
                    email,
                    name,
                    hashed,
                    role,
                    organisation,
                    seat,
                    gender,
                ];
            }

            const [rows, cols] = await conn.query(query, args);

            return uuid;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            if (conn) conn.release();
        }
    },

    findOne: async (email) => {
        let conn;
        let user = null;
        try {
            conn = await pool.getConnection();

            let query = `
                SELECT
                *
                FROM
                users
                WHERE
                email = ?
            `;

            const [rows, cols] = await conn.query(query, [email]);

            if (!!rows[0]) user = rows[0];
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            if (conn) conn.release();
        }
        return user;
    },
    findOneUUID: async (uuid) => {
        let conn;
        let user = null;
        try {
            conn = await pool.getConnection();

            let query = `
                SELECT
                *
                FROM
                users
                WHERE
                uuid = ?
            `;

            const [rows, cols] = await conn.query(query, [uuid]);

            if (!!rows[0]) user = rows[0];

            return user;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            if (conn) conn.release();
        }
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
                users
                WHERE
                name LIKE ?
                ORDER BY role, name  ASC
                LIMIT ?
                OFFSET ?
            `;

            let args = [like, limit, offset];

            if (forStats) {
                query = `
                SELECT
                COUNT(*) as COUNT
                FROM
                users
                WHERE
                name LIKE ?
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

    Delete: async (uuid) => {
        let conn;
        let success = false;
        try {
            conn = await pool.getConnection();
            await conn.beginTransaction();

            const deleteFromUsers = () => {
                return new Promise(async (resolve, reject) => {
                    try {
                        await conn.query("DELETE FROM users WHERE uuid = ?", [
                            uuid,
                        ]);
                        resolve();
                    } catch (e) {
                        reject(e);
                    }
                });
            };

            const deleteFromScores = () => {
                return new Promise(async (resolve, reject) => {
                    try {
                        await conn.query("DELETE FROM scores WHERE uuid = ?", [
                            uuid,
                        ]);
                        resolve();
                    } catch (e) {
                        reject(e);
                    }
                });
            };

            await Promise.all([deleteFromUsers(), deleteFromScores()]);

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

    Update: async (uuid, body) => {
        let conn;
        let success = false;
        try {
            let { organisation, seat, gender, name } = body;
            gender = gender === "Male" ? "M" : "F";
            seat = seat === "" ? null : seat;
            organisation =
                organisation === ""
                    ? role === "Admin"
                        ? "ORGANISER"
                        : "COMPETITOR"
                    : organisation;

            conn = await pool.getConnection();

            let query = `
                UPDATE
                users
                SET
                organisation = ?,
                seat = ?,
                gender = ?,
                name = ?
                WHERE
                uuid = ?
            `;

            let args = [organisation, seat, gender, name, uuid];

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
};

module.exports = users;

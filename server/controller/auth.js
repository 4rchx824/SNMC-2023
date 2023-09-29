const Users = require("../model/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = {
    Login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                throw new Error("Username and password are required");

            const user = await Users.findOne(email);
            if (user === null) throw new Error("Account does not exist!");

            const match = await bcrypt.compare(password, user.password);

            if (!match) throw new Error("Incorrect Password!");

            let { uuid, role } = user;

            const access = jwt.sign(
                {
                    uuid: uuid,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            );

            // res.cookie("auth", access, {
            //     httpOnly: true,
            //     maxAge: 3600000
            // })

            res.status(200).send({
                uuid: uuid,
                accessToken: access,
                role: role,
            });
        } catch (e) {
            let message = e.message;
            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    Verify: async (req, res) => {
        try {
            const { accessToken, uuid } = req;
            const user = await Users.findOneUUID(uuid);

            res.status(200).send({
                uuid: uuid,
                role: user.role,
                accessToken: accessToken,
            });
        } catch (e) {
            let message = e.message;
            console.error(e);
            res.status(500).send({ message: message });
        }
    },
};

module.exports = auth;

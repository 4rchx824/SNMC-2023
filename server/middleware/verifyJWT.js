const jwt = require("jsonwebtoken");
const protectedRoutes = require("../config/protectedRoutes");
const Users = require("../model/Users");

const verifyJWT = async (req, res, next) => {
    const urlCalled = req.originalUrl;
    let protected = false;

    protectedRoutes.forEach((e) => {
        // console.log("/" + urlCalled.split("/")[1])
        if (
            urlCalled.includes(e) &&
            protectedRoutes.includes("/" + urlCalled.split("/")[1])
        )
            protected = true;
    });

    console.log(protected ? "protected" : "unprotected");

    if (!protected) return next();

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

    const token = authHeader.split(" ")[1];

    if (token == "undefined") return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err)
            return res.status(401).send({ message: "Invalid access token." });

        const id = decoded.uuid;
        const { uuid, role } = await Users.findOneUUID(id);

        req.uuid = uuid;
        req.role = role;
        req.accessToken = token;

        next();
    });
};

module.exports = verifyJWT;

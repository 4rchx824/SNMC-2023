const verifyRoles = (allowedRoles) => {
    return (req, res, next) => {
        if (!req?.role) {
            return res.sendStatus(401);
        }
        const { role } = req;

        console.log(
            "verifyRoles.js is running, CURRENT ROLE:" +
                role  +
                "on the url: " +
                req.url
        );

        const result = allowedRoles.includes(role);

        if (!result) {
            return res.status(401).send({message: "Unauthorized Access"});
        }

        next();
    };
};

module.exports = verifyRoles;

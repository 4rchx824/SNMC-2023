require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const allowedOrigins = require("./config/allowedOrigins");
const verifyJWT = require("./middleware/verifyJWT");
const verifyRole = require("./middleware/verifyRole");

// const verifyJWT = require("./middleware/verifyJwt");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3069;

// const corsOptions = require("./config/corsOptions");
// app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

// make verify jwt
// make verify role for endpoints

// app.use("/", require("./routes/root"));
// app.use("/register", require("./routes/register"));
// app.use("/auth", require("./routes/auth"));
// app.use("/refresh", require("./routes/refresh"));
// app.use("/logout", require("./routes/logout"));

app.use("/auth", require("./routes/auth"));
app.use("/leaderboard", require("./routes/api/leaderboard"));

app.use(verifyJWT);
app.use("/verify", require("./routes/verify"));
app.use("/users", require("./routes/api/users"));
app.use("/events", require("./routes/api/events"));
app.use("/scores", require("./routes/api/scores"));

app.get("/ping", (req, res) => {
    res.status(200).send("pong");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const dotenv = require("dotenv");
dotenv.config();
require("./config/db");
const cors = require("cors");
const express = require("express");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use("/auth", authRoutes);

app.listen(process.env.AUTH_SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.AUTH_SERVER_PORT}`);
});

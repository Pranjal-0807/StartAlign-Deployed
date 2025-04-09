const dotenv = require("dotenv");
dotenv.config();

require("./config/db");

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({
    origin: "*",
    credentials: true
}));

const { authToken } = require("./middlewares/auth.middleware");
const projectRoutes = require("./routes/project.routes")
const subTaskRoutes = require("./routes/subTask.routes")
const userRoutes = require("./routes/user.routes")

app.use(authToken);
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/projects", projectRoutes);
app.use("/subTasks", subTaskRoutes);
app.use("/users", userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

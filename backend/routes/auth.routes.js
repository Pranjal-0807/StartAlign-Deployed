const router = require("express").Router();

const {
    createUser,
    loginUser,
    refreshToken,
    logoutUser,
    getUsernameFromRefreshToken,
} = require("../controllers/auth.controller");

router.post("/signup", createUser);

router.post("/login", loginUser);

router.post("/token", refreshToken);

router.delete("/logout/:token", logoutUser);

router.post("/user", getUsernameFromRefreshToken);

module.exports = router;

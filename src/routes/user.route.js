const { Router } = require("express");
const userController = require("../controllers/user.controller");
const verifyTokenAndRole = require("../middlewares/tokenAndRole.middleware");

class UserRoute {
    constructor () {
        this.route = Router();
        this.initRoutes()
    }

    initRoutes () {
        this.route.post("/send-otp", userController.sendOtp);
        this.route.post("/verify-otp", userController.verifyOtp);
        this.route.post("/register", userController.userRegistration);
        this.route.post("/login", userController.userLogined);
        this.route.get("/", userController.getData);
        this.route.get("/:id", userController.getDataById);
        this.route.post("/", verifyTokenAndRole(['ADMIN', 'USER']), userController.createNewUser);
        this.route.patch("/:id", verifyTokenAndRole(['ADMIN', 'SUPER_ADMIN']), userController.updateUser);
        this.route.delete("/:id", verifyTokenAndRole(['ADMIN']), userController.deleteUser);
    }
};

const userRoute = new UserRoute().route;
module.exports = userRoute
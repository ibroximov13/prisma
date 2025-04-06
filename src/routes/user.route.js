const {Router} = require("express");
const userController = require("../controllers/user.controller");

class UserRoute {
    constructor () {
        this.route = Router();
        this.initRoutes()
    }

    initRoutes () {
        this.route.get("/", userController.getData)
    }
};

const userRoute = new UserRoute().route;
module.exports = userRoute
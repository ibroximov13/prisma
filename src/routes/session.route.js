const { Router } = require("express");
const sessionController = require("../controllers/session.controller");
const verifyTokenAndRole = require("../middlewares/tokenAndRole.middleware");

class SessionRoute {
    constructor(){
        this.route = Router();
        this.initRoutes();
    };
    initRoutes() {
        this.route.get("/", verifyTokenAndRole(["USER", "ADMIN", "SUPER_ADMIN"]), sessionController.getData);
        this.route.delete("/:id", verifyTokenAndRole(["USER", "ADMIN", "SUPER_ADMIN"]), sessionController.deleteData);
    }
};

const sessionRoute = new SessionRoute().route;
module.exports = sessionRoute
const { Router } = require("express");
const categoryController = require("../controllers/category.controller");
const verifyTokenAndRole = require("../middlewares/tokenAndRole.middleware");

class CategoryRoute {
    constructor(){
        this.route = Router();
        this.initRoutes()
    }

    initRoutes() {
        this.route.get("/", categoryController.getData);
        this.route.get("/:id", categoryController.getDataById);
        this.route.post("/", verifyTokenAndRole(["ADMIN"]) ,categoryController.createNewCategory);
        this.route.patch("/:id", verifyTokenAndRole(["ADMIN", "SUPER_ADMIN"]) ,categoryController.updateCategory);
        this.route.delete("/:id", verifyTokenAndRole(["ADMIN"]), categoryController.deleteCategory);
    }
};

const categoryRoute = new CategoryRoute().route;
module.exports = categoryRoute
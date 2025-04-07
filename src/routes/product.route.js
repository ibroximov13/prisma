const { Router } = require("express");
const productController = require("../controllers/product.controller");
const verifyTokenAndRole = require("../middlewares/tokenAndRole.middleware");

class ProductRoute {
    constructor() {
        this.route = Router();
        this.initRoutes()
    };

    initRoutes() {
        this.route.get("/", productController.getData);
        this.route.get("/:id", productController.getDataById);
        this.route.post("/", verifyTokenAndRole(["ADMIN"]) ,productController.createNewProduct);
        this.route.patch("/:id", verifyTokenAndRole(["ADMIN", "SUPER_ADMIN"]), productController.updateProduct);
        this.route.delete("/:id", verifyTokenAndRole(['ADMIN']), productController.deleteProduct);
    };
};

const productRoute = new ProductRoute().route;
module.exports = productRoute;
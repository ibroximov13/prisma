const { Router } = require("express");
const upload = require("../config/multer");
const uploadImage = require("../controllers/upload.controller");
const verifyTokenAndRole = require("../middlewares/tokenAndRole.middleware");

class UploadRoute {
    constructor() {
        this.route = Router();
        this.initRoutes()
    };

    initRoutes() {
        this.route.post("/uploads", verifyTokenAndRole(["ADMIN"]) ,upload.single("image"), uploadImage);
    };
};

const uploadRoute = new UploadRoute().route;
module.exports = uploadRoute
const express = require("express");
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const productRoute = require("./routes/product.route");
const uploadRoute = require("./routes/upload.route");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const sessionRoute = require("./routes/session.route");


module.exports = class App {
    constructor() {
        this.app = express();
        this.configMiddleware()
        this.configRoutes()
    };

    configMiddleware() {
        this.app.use(express.json());
    }

    configRoutes() {
        this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
        this.app.use("/user", userRoute);
        this.app.use("/category", categoryRoute);
        this.app.use("/product", productRoute);
        this.app.use("/upload-image", uploadRoute);
        this.app.use("/sessions", sessionRoute);
    }

    start() {
        this.app.listen(3000, () => console.log("Server started has been on PORT 3000"))
    }
};
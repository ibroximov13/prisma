const express = require("express");
const userRoute = require("./routes/user.route");

module.exports = class App {
    constructor() {
        this.app = express();
        this.configMiddleware
        this.configRoutes()
    };

    configMiddleware() {
        this.app.use(express.json());
    }

    configRoutes() {
        this.app.use(userRoute);
    }

    start() {
        this.app.listen(3000, () => console.log("Server started has been on PORT 3000"))
    }
}
const userService = require("../services/user.service");

class UserController {
    async getData(req, res) {
        try {
            const data = await userService.getData();
            res.send(data);
        } catch (error) {
            console.log(error);
        }
    }

    async getDataById(req, res) {
        try {
            const data = await userService.getDataById(req.params.id);
            res.send(data);
        } catch (error) {
            console.log(error);
        }
    }

    async createNewUser(req, res) {
        try {
            const data = await userService.createNewUser(req.body);
            res.send(data)
        } catch (error) {
            console.log(error);
        }
    }

    async updateUser (req, res) {
        try {
            const data = await userService.updateUser(req.params.id, req.body)
            res.send(data)
        } catch (error) {
            console.log(error);
        }
    }

    async deleteUser (req, res) {
        try {
            const data = await userService.deleteUser(req.params.id);
            res.send(data)
        } catch (error) {
            console.log(error);
        }
    }
};

const userController = new UserController();
module.exports = userController;
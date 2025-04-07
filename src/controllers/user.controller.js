const userService = require("../services/user.service");
const userValidation = require("../validation/user.validate");

class UserController {
    async sendOtp (req, res) {
        try {
            const { error, value } = userValidation.sendOtpValidate(req.body);
            if (error) {
                return res.status(422).send(error.details[0].message);
            };
            const data = await userService.sendOtp(value);
            res.status(200).send(data)
        } catch (error) {
            console.log(error);
        }
    }

    async verifyOtp (req, res) {
        try {
            const { error, value } = userValidation.verifyOtpValidate(req.body);
            if (error) {
                return res.status(422).send(error.details[0].message);
            };
            const data = await userService.verifyOtp(value);
            res.status(200).send(data)
        } catch (error) {
            console.log(error);
        }
    };

    async userRegistration (req, res) {
        try {
            const { error, value } = userValidation.userRegisterValidate(req.body);
            if (error) {
                return res.status(422).send(error.details[0].message);
            };
            const data = await userService.userRegistration(value);
            res.status(200).send(data)
        } catch (error) {
            console.log(error);
        }
    };

    async userLogined (req, res) {
        try {
            const { error, value } = userValidation.userLoginValidate(req.body);
            if (error) {
                return res.status(422).send(error.details[0].message);
            };
            const userIp = req.headers["x-forwarded-for"] || req.body.ipAddress;
            const userAgent = req.headers["user-agent"];
            const data = await userService.userLogined(value, userIp, userAgent);

            if (data.status && data.status !== 200) {
                return res.status(data.status).send({ message: data.message });
            }
            res.status(200).send(data)
        } catch (error) {
            console.log(error);
        }
    }

    async getData(req, res) {
        try {
            let page = parseInt(req.query.page) || 1;
            let take = parseInt(req.query.take) || 10;
            let skip = (page - 1) * take;
            let contains = req.query.contains?.trim();

            let order = req.query.order === "DESC" ? "DESC" : "ASC";
            let allowedColumns = ["id", "name"];
            let column = allowedColumns.includes(req.query.column) ? req.query.column : "id";

            let where = {};

            if (contains) {
                where.OR = [
                    { id: { contains, mode: "insensitive" } },
                    { name: { contains, mode: "insensitive" } },
                ];
            };
            const data = await userService.getData(take, skip, column, order, where);
            res.send(data);
        } catch (error) {
            console.log(error);
        }
    }

    async getDataById(req, res) {
        try {
            const data = await userService.getDataById(req.params.id);
            if (data.status && data.status !== 200) {
                return res.status(data.status).send({ message: data.message });
            }
            res.send(data);
        } catch (error) {
            console.log(error);
        }
    }

    async createNewUser(req, res) {
        try {
            const {error, value} = userValidation.createUserValidate(req.body)
            if (error) {
                res.status(422).send(error.details[0].message)
            }
            const data = await userService.createNewUser(value);
            
            res.send(data)
        } catch (error) {
            console.log(error);
        }
    }

    async updateUser (req, res) {
        try {
            const {error, value} = userValidation.updateUserValidate(req.body)
            if (error) {
                res.status(422).send(error.details[0].message)
            }
            const data = await userService.updateUser(req.params.id, value);
            if (data.status && data.status !== 200) {
                return res.status(data.status).send({ message: data.message });
            }
            res.send(data)
        } catch (error) {
            console.log(error);
        }
    }

    async deleteUser (req, res) {
        try {
            const data = await userService.deleteUser(req.params.id);
            if (data.status && data.status !== 200) {
                return res.status(data.status).send({ message: data.message });
            }
            res.send(data)
        } catch (error) {
            console.log(error);
        }
    }
};

const userController = new UserController();
module.exports = userController;
const sessionSevice = require("../services/session.service");

class SessionController {
    async getData (req, res) {
        try {
            const id = req.user.id;
            const data = await sessionSevice.getData(id);
            res.status(200).send(data);
        } catch (error) {
            console.log(error);
        }
    }
    async deleteData (req, res) {
        try {
            const data = await sessionSevice.deleteData(req.params.id);
            res.status(200).send(data);
        } catch (error) {
            console.log(error);
        }
    }
};

const sessionController = new SessionController();
module.exports = sessionController
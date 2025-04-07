const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class SessionService {
    async getData (userId) {
        return await prisma.session.findMany({
            where: {
                userId: parseInt(userId)
            }
        });
    };

    async deleteData (id) {
        return await prisma.session.delete({
            where: {
                id: parseInt(id)
            }
        })
    }
};

const sessionSevice = new SessionService();
module.exports = sessionSevice;
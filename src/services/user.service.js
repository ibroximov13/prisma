const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

class UserService {
    async getData () {
        return prisma.user.findMany()
    }
    async getDataById (id) {
        return prisma.user.findUnique({where: {id}})
    }
    async createNewUser (data){ 
        return prisma.user.create({data})
    }
    async updateUser (id, data){
        return prisma.user.update({
            where: { id },
            data
        })
    }
    async deleteUser (id) {
        return prisma.user.delete(id)
    }
};

const userService = new UserService();
module.exports = userService
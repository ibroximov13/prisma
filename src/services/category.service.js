const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

class CategoryService {
    async getData(take, skip, column, order, where) {
        return await prisma.category.findMany({
            where: {},  
            take: take || 10,  
            skip: skip || 0,   
            orderBy: {
                [column]: order === "DESC" ? "desc" : "asc",  
            },
        })
    };

    async getDataById(id) {
        const findCategory = await prisma.category.findFirst({
            where: {id: parseInt(id)}
        });

        if (!findCategory) {
            return {status: 404, message: "Category not found"}
        };
        
        return await prisma.category.findFirst({
            where: {
                id: parseInt(id)
            }
        })
    };

    async createNewCategory (userId, data) {
        return await prisma.category.create({data: {
            name: data.name,
            photo: data.photo,
            userId: userId,
        }})
    };

    async updateCategory (id, data) {
        const findCategory = await prisma.category.findFirst({
            where: {id: parseInt(id)}
        });

        if (!findCategory) {
            return {status: 404, message: "Category not found"}
        };

        return await prisma.category.update({
            where: {id: parseInt(id)},
            data: data
        })
    };

    async deleteCategory (id) {
        const findCategory = await prisma.category.findUnique({
            where: {id: parseInt(id)}
        });

        if (!findCategory) {
            return {status: 404, message: "Category not found"}
        };
        
        return await prisma.category.delete({
            where: {id: parseInt(id)}
        })
    }
};

const categoryService = new CategoryService();
module.exports = categoryService
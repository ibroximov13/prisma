const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProductService {
    async getData(take, skip, gtePrice, contains, categoryId) {
        return await prisma.product.findMany({
            where: {
                price: gtePrice ? { gte: gtePrice } : undefined,
                categoryId: categoryId ? categoryId : undefined,
                ...(contains && {
                    OR: [
                        { color: { contains, mode: "insensitive" } },
                        { name: { contains, mode: "insensitive" } }
                    ]
                })
            },
            include: {
                Category: true
            },
            take: take,
            skip: skip,
            omit: { categoryId: true },
        });
    }

    async getDataById (id) {
        const findData = await prisma.product.findFirst({
            where: {
                id: parseInt(id)
            }
        });

        if (!findData) {
            return {status: 404, message: "Product not found"}
        }
        return findData
    };

    async createNewProduct (data) {
        return await prisma.product.create({data: data})
    };

    async updateProduct (id, data) {
        const findData = await prisma.product.findFirst({
            where: {id: parseInt(id)}
        });
        if (!findData) {
            return {status: 404, message: "Product not found"}
        }
        return await prisma.product.update({
            where: {id: parseInt(id)},
            data: data
        })
    };

    async deleteProduct (id) {
        const findData = await prisma.product.findFirst({
            where: {id: parseInt(id)}
        });
        if (!findData) {
            return {status: 404, message: "Product not found"}
        }
        return await prisma.product.delete({where: {id: parseInt(id)}})
    }
};

const productService = new ProductService();
module.exports = productService
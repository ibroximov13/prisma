const productService = require("../services/product.service");
const productValidation = require("../validation/product.validate");

class ProductController {
    async getData(req, res) {
        try {
            let page = parseInt(req.query.page) || 1;
            let take = parseInt(req.query.take) || 10;
            let skip = (page - 1) * take;
            let gtePrice = req.query.gtePrice ? parseInt(req.query.gtePrice) : null;
            let contains = req.query.contains?.trim();
            let categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : null;
            const data = await productService.getData(take, skip, gtePrice, contains, categoryId); 
            res.status(200).send(data);
        } catch (error) {
            console.log(error);
        }
    }
    async getDataById (req, res) { 
        try {
            const data = await productService.getDataById(req.params.id);
            if (data.status && data.status !== 200) {
                return res.status(data.status).send({ message: data.message });
            }
            res.status(200).send(data);
        } catch (error) {
            console.log(error);
        }
    }

    async createNewProduct (req, res) {
        try {
            const { error, value } = productValidation.createProductValidate(req.body);
            if (error) {
                return res.status(422).send(error.details[0].message)
            }

            const data = await productService.createNewProduct(value)
            if (data.status && data.status !== 200) {
                return res.status(data.status).send({ message: data.message });
            };
            res.status(201).send(data)
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct (req, res) {
        try {
            const { error, value } = productValidation.updateProductValidate(req.body);
            if (error) {
                return res.status(422).send(error.details[0].message)
            }
            const data = await productService.updateProduct(req.params.id, value);
            if (data.status && data.status !== 200) {
                return res.status(data.status).send({ message: data.message });
            }
            res.status(200).send(data)
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct (req, res) {
        try {
            const data = await productService.deleteProduct(req.params.id);
            if (data.status && data.status !== 200) {
                return res.status(data.status).send({ message: data.message });
            }
            res.status(200).send(data)
        } catch (error) {
            console.log(error);
        }
    }
};

const productController = new ProductController();
module.exports = productController;
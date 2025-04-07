const categoryService = require("../services/category.service");
const categoryValidation = require("../validation/category.validate");

class CategoryController {
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
            const data = await categoryService.getData(take, skip, column, order, where);
            res.status(200).send(data);
        } catch (error) {
            console.log(error);
        }
    };

    async getDataById(req, res) {
        try {
           const data = await categoryService.getDataById(req.params.id);

           if (data.status && data.status !== 200) {
            return res.status(data.status).send({ message: data.message });
            }
           res.status(200).send(data)
        } catch (error) {
            console.log(error);
        }
    }

    async createNewCategory (req, res) {
        try {
            const { error, value } = categoryValidation.createCategoryValidate(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            const userId = req.user.id;
            const data = await categoryService.createNewCategory(userId, value);
            if (data.status && data.status !== 200) {
                return res.status(data.status).send({ message: data.message });
            }
            res.status(200).send(data)
        } catch (error) {
            console.log(error);
        }
    };

    async updateCategory (req, res) {
        try {
            const { error, value } = categoryValidation.updateCategoryValidate(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            };
            const data = await categoryService.updateCategory(req.params.id, value);
            if (data.status && data.status !== 200) {
                return res.status(data.status).send({ message: data.message });
            }
            res.status(200).send(data)
        } catch (error) {
            console.log(error);   
        }
    };

    async deleteCategory (req, res) {
        try {
            const data = await categoryService.deleteCategory(req.params.id);
            if (data.status && data.status !== 200) {
                return res.status(data.status).send({ message: data.message });
            }
            res.status(200).send(data)
        } catch (error) {
            console.log(error);   
        }
    }

};

const categoryController = new CategoryController();
module.exports = categoryController;
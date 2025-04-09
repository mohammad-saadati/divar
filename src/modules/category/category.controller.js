const CategoryMessages = require("./category.message");
const categoryService = require("./category.service");
const { StatusCodes } = require("http-status-codes");
const autoBind = require("auto-bind");

class CategoryController {
  #service;

  constructor() {
    this.#service = categoryService;
    autoBind(this);
  }

  async create(req, res, next) {
    try {
      const { name, slug, icon, parent } = req.body;

      await this.#service.create({ name, slug, icon, parent });

      res.status(StatusCodes.CREATED).json({
        message: CategoryMessages.Created,
      });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const categories = this.#service.get();
      
      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();

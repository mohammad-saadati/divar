const autoBind = require("auto-bind");
const CategoryModel = require("./category.model");
const createHttpError = require("http-errors");

class CategoryService {
  #model;

  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
  }

  async create(categoryDto) {}
  async get() {
    const categories = await this.#model.find();

    return categories;
  }
}

module.exports = new CategoryService();

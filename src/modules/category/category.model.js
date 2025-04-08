const { Schema, Types, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: { type: String, unique: true },
    slug: { type: String, unique: true, index: true },
    icon: { type: String, unique: true },
    parent: { type: Type.ObjectId, ref: "Category", required: false },
    parents: {
      type: [Types.ObjectId],
      ref: "Category",
      required: false,
      default: [],
    },
  },
  { virtuals: true, versionKey: false, id: false }
);

CategorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignKey: "parent",
});

const CategoryModel = model("Category", CategorySchema);

module.exports = CategoryModel;

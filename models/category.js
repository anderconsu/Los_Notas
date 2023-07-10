import connection from "../config/sequalize.js";
import Sequelize from "sequelize";

const Category = connection.define(
  "category",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
  },
  { indexes: [{ unique: true, fields: ["name"] }] }
);

export default Category;

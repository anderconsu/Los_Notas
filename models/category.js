import connection from "../config/sequalize.js";
import Sequelize from "sequelize";
//Define the table Category made in mysql for secualice.
const Category = connection.define(
  "category",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      UNSIGNED: true,
    },
    name: {
      type: Sequelize.STRING(45),
      allowNull: false,
      unique: true,
    },
  },
);

export default Category;

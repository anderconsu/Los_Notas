import connection from "../config/sequalize.js";
import Sequelize from "sequelize";
import Client from "./client.js";
import Category from "./category.js";

const Note = connection.define(
  "note",
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING(250),
      allowNull: false,
    },
    flag: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },
    client_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }
);

Note.belongsTo(Client, { foreignKey: "client_id" });
Note.belongsTo(Category, { foreignKey: "category_id" });

export default Note;

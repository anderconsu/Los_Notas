import connection from "../config/sequalize.js";
import Sequelize from "sequelize";

const Client = connection.define(
  "client",
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
  },
  { indexes: [{ unique: true, fields: ["username"] }] }
);

export default Client;

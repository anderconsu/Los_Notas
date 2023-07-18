import connection from "../config/sequalize.js";
import Sequelize from "sequelize";
//Define the table Client made in mysql for secualice.
const Client = connection.define(
  "client",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unsigned: true,
    },
    username: {
      type: Sequelize.STRING(45),
      allowNull: false,
      unique: true,
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
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    rol: {
      type: Sequelize.STRING(10),
    }
  },
);

export default Client;

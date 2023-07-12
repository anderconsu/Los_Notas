import Client from "../models/client.js";
import Sequelize from "sequelize";
import bcrypt from "bcrypt";

class ClientController {
  async createClientView(req, res){
    res.render("client/signup");
  }
  async createClient(req, res) {
      try {
        let { username, name, lastname, password, password_repeat } = req.body;
        console.log(req.body);
        if (password !== password_repeat) {
          let errorItem = new Sequelize.ValidationErrorItem({
            message: "Las contraseñas no coinciden, joder!",
            path: "password",
            type: "Validation error",
          });
          throw new Sequelize.ValidationError("", [errorItem]);
        }
        let hash = await bcrypt.hash(password, 10);

        const client = await Client.create({
          username,
          name,
          lastname,
          password:hash,
        });
        res.status(201).json(client);
      } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
          console.log("errors", error.errors);
          if (error.errors.length > 0) {
            if (error.errors[0].type === "notNull Violation") {
              error.message = "Todos los campos son obligatorios";
            } else if (error.errors[0].type === "unique violation") {
              error.message = "El usuario ya existe";
            } else if (error.errors[0].type === "Validation error") {
              error.message = error.errors[0].message;
            }
          } else {
            console.log("message", error.message);
          }
        } else {
          error.message = "Error desconocido al registrarse";
        }
        
      }
  }
  
  async createLoginView(req, res){
    res.render("client/login");
  }

  async verifyLogin (req, res){
    try {
      let { username, password } = req.body;
      const client = await Client.findOne({
        where: {
          username,
        },
      })
      if (!client){
        throw new Error("No existe el usuario");
      }else{
        if (await bcrypt.compare(password, client.password)) {
          res.json(client);
        } else {
          throw new Error("Contraseña incorrecta");
        }
          // Guardar la sesión
          req.session.client = client;
      }
    }catch (error) {
      console.log(error)
      res.status(401).redirect("/client/signup");
    }
  }
  updateClient() {
    async (req, res) => {
      try {
        const { id } = req.params;
        const { username, name, lastname, password } = req.body;

        const user = await Client.findByPk(id);

        if (user) {
          user.username = username;
          user.name = name;
          user.lastname = lastname;
          user.password = password;

          await user.save();

          res.json(user);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } catch (error) {
        res.status(500).json({ error: "Error updating user" });
      }
    };
  }
  deleteClient() {
    async (req, res) => {
      try {
        const { id } = req.params;

        const client = await Client.findByPk(id);

        if (client) {
          await client.destroy();

          res.sendStatus(204);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
      }
    };
  }
}

let newClientController = new ClientController();

export default newClientController;

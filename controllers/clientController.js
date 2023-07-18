import Client from "../models/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class ClientController {
    async createClientView(req, res) {
        res.render("client/signup");
    }
    async createClient(req, res) {
        try {
            let { username, name, lastname, password, password_repeat } =
                req.body;
            if (!username || !name || !lastname || !password || !password_repeat) {
                throw new Error("All fields are required");
            }
            if (username.length < 3) {
                throw new Error("Username must be at least 3 characters");
            }
            if (password !== password_repeat) {
                throw new Error("Passwords do not match");
            }
            // Regular expression for password validation
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if (!passwordRegex.test(password)) {
                throw new Error(
                    "Regex error"
                );
            }
            const existingClient = await Client.findOne({ username });
            if (existingClient) {
                throw new Error("The username is already taken");
            }
            let hash = await bcrypt.hash(password, 10);
            const client = await Client.create({
                username,
                name,
                lastname,
                password: hash,
            });
            res.status(201).redirect("/client/login");
        } catch (error) {
            let errorMessage = "";
            let status = 0;
            console.error("Error creating client:", error);
            // Handle specific errors and send appropriate responses
            if (error.message === "Passwords do not match") {
                errorMessage = "Las contraseñas no coinciden."
                status = 403
            } else if (error.message === "The username is already taken") {
                errorMessage = "El usuario ya existe."
                status = 403
            } else if (error.message === "Regex error") {
                errorMessage = "La contraseña debe tener al menos 8 carácteres, una mayúscula, una minúscula y un número."
                status = 403
            } else if (error.message === "All fields are required") {
                errorMessage = "Todos los campos son obligatorios."
                status = 403
            } else if (error.message === "Username must be at least 3 characters") {
                errorMessage = "El nombre de usuario debe tener al menos 3 caracteres."
                status = 403
            }
            else {
                res.status(500).json({ error: "Internal Server Error" });
            }
            console.log("he llegado hasta aqui");
            res.status(status).render(`client/signup`, {errorMessage });
        }
    }
    async createClientApi(req, res) {
        try {
            let { username, password, password_repeat } = req.body;
            if (password !== password_repeat) {
                return res.status(400).json({
                    error: "Las contraseñas no coinciden",
                });
            }
            let hash = await bcrypt.hash(password, 11);
            let result = await Usuario.create({ username, password: hash });
            return res.status(200).json(result);
        } catch (error) { 
            console.log(error);
            return res.status(500).json({
                error: "Error desconocido al registrarse",
            });
        }
    }
    async createLoginView(req, res) {
        res.render("client/login");
    }
    async verifyLogin(req, res) {
        try {
            let { username, password } = req.body;
            const client = await Client.findOne({
                where: {
                    username,
                },
            });
            if (!client) {
                throw new Error("User or password not corrrect");
            } else {
                if (await bcrypt.compare(password, client.password)) {
                    // Guardar la sesión
                    req.session.client = client;
                    // Redirigir al usuario
                    res.redirect("/");
                } else {
                    throw new Error("User or password not corrrect");
                }
            }
        } catch (error) {
            console.log(error);
            let status = 0;
            let errorMessage = "";
            if (error.message === "User or password not corrrect") {
                errorMessage = "Usuario o contraseña incorrecto.";
                status = 403;
            } else {
                res.status(500).json({
                    error: "Error desconocido al iniciar sesión",
                });
            }
            res.status(status).render("client/login", { errorMessage });
        }
    }
    async verifyLoginApi(req, res) {
        console.log(req.body);
        try {
            let { username, password } = req.body;
            let client = await Client.findOne({ where: { username } });
            if (!client) {
                return res.status(400).json({
                    error: "User or password not corrrect",
                });
            }
            let hash = client.password;
            let iguales = await bcrypt.compare(password, hash);
            console.log(iguales);
            if (!iguales) {
                return res.status(400).json({
                    error: "User or password not corrrect",
                });
            }

            // Generar token JWT
            let payload = { username };
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            return res.status(200).json({
                token,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: "Error desconocido al iniciar sesión",
            });
        }
    }


    async logout(req, res) {
        try {
          if (req.session.client) {
            // Eliminar la sesión del cliente
            req.session.destroy();
    
            res.redirect("/");
          } else {
            // El cliente no está logueado
            res.redirect("/");
          }
        } catch (error) {
          res.status(500).json({ error: "Error logging out" });
        }
      }


    /*   updateClient() {
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
  } */
}

let newClientController = new ClientController();

export default newClientController;
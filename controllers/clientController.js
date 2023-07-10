import Client from "../models/client.js";

class ClientController {
    constructor(){
    }
    createClient(){
        async (req, res) => {
        try {
            const { username, name, lastname, password } = req.body;

            const client = await Client.create({
            username,
            name,
            lastname,
            password,
            });

            res.status(201).json(client);
        } catch (error) {
            res.status(500).json({ error: "Error creating user" });
        }
        }
    } 
    updateClient(){
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
          }
    }
    deleteClient(){
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
            }
    }
}

let newClientController = new ClientController

export default newClientController;
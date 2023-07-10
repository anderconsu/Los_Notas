import express from "express";
import newClientController from "../controllers/clientController.js";

const router = express.Router();

// Rutas relacionadas con usuarios
router.post("/signup", newClientController.createClient);
// Otras rutas de usuarios...
router.get("/signup", (req, res) => {newClientController.createClientView(req, res)});

export default router;

// const usuarioController = {
//     registerForm: (req, res) => {
//         res.render("usuario/register");
//     },
// router.get("/register",(req,res)=>{
//     usuarioController.registerForm(req,res);
// });
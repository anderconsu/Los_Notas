import {Router} from "express";
import newClientController from "../controllers/clientController.js";

const router = Router();

// Rutas relacionadas con usuarios
router.post("/signup", (req, res) => {newClientController.createClient(req, res)});
// Otras rutas de usuarios...
router.get("/signup", (req, res) => {newClientController.createClientView(req, res)});

//Router login
router.get("/login", (req, res) => {newClientController.createLoginView(req, res)});
router.post("/login", (req, res) => {newClientController.verifyLogin(req, res)});


// Ruta de logout
router.get("/logout", (req, res) => { newClientController.logout(req, res) });



export default router;

// const usuarioController = {
//     registerForm: (req, res) => {
//         res.render("usuario/register");
//     },
// router.get("/register",(req,res)=>{
//     usuarioController.registerForm(req,res);
// });
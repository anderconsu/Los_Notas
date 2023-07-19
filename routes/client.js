import {Router} from "express";
import newClientController from "../controllers/clientController.js";

const router = Router();

// Sign-up route
router.post("/signup", (req, res) => {newClientController.createClient(req, res)});
router.get("/signup", (req, res) => {newClientController.createClientView(req, res)});

//Log-in router
router.get("/login", (req, res) => {newClientController.createLoginView(req, res)});
router.post("/login", (req, res) => {newClientController.verifyLogin(req, res)});

// Log-out route
router.get("/logout", (req, res) => { newClientController.logout(req, res) });

export default router;
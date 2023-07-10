import express from "express";
import newClientController from "../controllers/clientController.js";

const router = express.Router();

// Rutas relacionadas con usuarios
router.post("/signup", newClientController.createClient);
// Otras rutas de usuarios...
router.get("/signup", newClientController.createClientView);

export default router;
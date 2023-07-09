import express from "express";
import clientController from "../controllers/clientController.js";

const router = express.Router();

// Rutas relacionadas con usuarios
router.post("/", clientController.createClient);
// Otras rutas de usuarios...

export default router;
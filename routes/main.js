import express from "express";
//import homeRoutes from "./home.js";
import clientRoutes from "./client.js";
import noteRoutes from "./note.js";


const router = express.Router();


// Rutas principales
//router.use("/", homeRoutes);
router.use("/client",clientRoutes);
router.use("/note", noteRoutes);

export default router;
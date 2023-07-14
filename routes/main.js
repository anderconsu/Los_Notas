import express from "express";
import notes from "../controllers/noteController.js";
import clientRoutes from "./client.js";
import noteRoutes from "./note.js";
import apiRoutes from "./api.js";


const router = express.Router();


// Rutas principales

router.get("/", (req, res) => {notes.renderAllNotes(req, res)});

router.use("/client",clientRoutes);
router.use("/note", noteRoutes);
router.use("/api", apiRoutes);

export default router;
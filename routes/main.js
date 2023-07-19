import express from "express";
import notes from "../controllers/noteController.js";
import clientRoutes from "./client.js";
import noteRoutes from "./note.js";
import apiRoutes from "./api.js";
//MAIN ROUTER - ALL ROUTES START FROM HERE.

const router = express.Router();

router.get("/", (req, res) => {notes.renderAllNotes(req, res)});
router.use("/client",clientRoutes);
router.use("/note", noteRoutes);
router.use("/api", apiRoutes);

export default router;




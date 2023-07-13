import express from "express";
//import homeController from "../controllers/homeController.js";
import noteController from "../controllers/noteController.js";

const router = express.Router();

// Ruta de la página principal
//router.get("/", homeController.index);
router.get("/", (req, res) => {noteController.renderAllNotes});
export default router;
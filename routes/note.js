import express from "express";
import noteController from "../controllers/noteController.js";
import {loggedInMiddleware, jwtMiddleware} from "../middleware/loggedin.js";

const router = express.Router();

// Rutas relacionadas con notas
// router.post("/", noteController.createNote);
// router.put("/:id", noteController.updateNote);
// router.delete("/:id", noteController.deleteNote);
// Otras rutas de notas...
router.get("/all",loggedInMiddleware, (req, res) => {noteController.renderAllNotes(req, res)});
export default router;
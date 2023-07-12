import express from "express";
import newClientController from "../controllers/clientController.js";
import noteController from "../controllers/noteController.js";



const router = express.Router();

router.post("/client", (req, res) => {newClientController.verifyLogin(req, res)});
router.post("/note", (req, res) => {noteController.getallNotes(req, res)});
router.post("/note/:id", (req, res) => {noteController.getSpecificNote(req, res)});
router.post("/note/category/:id", (req, res) => {noteController.getByCategory(req, res)});



export default router;
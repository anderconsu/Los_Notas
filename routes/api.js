import express from "express";
import newClientController from "../controllers/clientController.js";
import noteController from "../controllers/noteController.js";
import {loggedInMiddleware, jwtMiddleware} from "../middleware/loggedin.js";


const router = express.Router();

router.post("/client/login", (req, res) => {newClientController.verifyLoginApi(req, res)});
router.get("/note", jwtMiddleware, (req, res) => {noteController.getallNotes(req, res)});
router.get("/note/:id", jwtMiddleware, (req, res) => {noteController.getSpecificNote(req, res)});
router.get("/note/category/:id", jwtMiddleware, (req, res) => {noteController.getByCategory(req, res)});


export default router;
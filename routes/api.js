import express from "express";
import newClientController from "../controllers/clientController.js";
import noteController from "../controllers/noteController.js";
import {loggedInMiddleware, jwtMiddleware} from "../middleware/loggedin.js";


const router = express.Router();

router.post("/client/login", (req, res) => {newClientController.verifyLoginApi(req, res)});
router.get("/note", jwtMiddleware, (req, res) => {noteController.getallNotesApi(req, res)});
router.get("/note/id/:id", jwtMiddleware, (req, res) => {noteController.getSpecificNoteApi(req, res)});
router.get("/note/category/:id", jwtMiddleware, (req, res) => {noteController.getByCategoryApi(req, res)});
router.get("/note/category", jwtMiddleware, (req, res) => {noteController.getAllCategoriesApi(req, res)});

export default router;
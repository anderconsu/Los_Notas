import express from "express";
import noteController from "../controllers/noteController.js";
import {loggedInMiddleware, jwtMiddleware} from "../middleware/loggedin.js";

const router = express.Router();

//All routes api related
router.get("/all",loggedInMiddleware, (req, res) => {noteController.renderAllNotes(req, res)});
router.get("/id/:id", loggedInMiddleware, (req, res) => {noteController.getSpecificNote(req, res)});
router.get("/category/:id", loggedInMiddleware, (req, res) => {noteController.renderByCategory(req, res)});
router.get("/create", loggedInMiddleware, (req, res) => {noteController.renderCreateNote(req, res)});
router.post("/create", (req, res) => {noteController.createNote(req, res)});
router.get("/delete/:id", (req, res) => {noteController.deleteNote(req, res)});
export default router;
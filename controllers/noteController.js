import Note from "../models/note.js";
import Client from "../models/client.js";
import Category from "../models/category.js";
import session from "express-session";
import { render } from "pug";

class NoteController {
    // NOTES INFO
        //Returns note[ARRAY] with all notes ramdomly mixed.
    async getallNotes(req, res) {
        // mix function ===
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        try {
            let notes = await Note.findAll({
                include: [
                    {
                        model: Client,
                        attributes: ["id", "username", "name", "lastname"],
                    },
                    {
                        model: Category,
                        attributes: ["name", "id"],
                    },
                ],
                attributes: ["id", "title", "content", "flag"],
            });
            //mix all notes randomly
            notes = shuffleArray(notes);
            return notes;
        } catch (error) {
            res.status(500).json({ error: "Error getting all notes" });
        }
    }
        //Returns note[ARRAY] .json with all notes ramdomly mixed.
    async getallNotesApi(req, res) {
        try {
            let notes = await Note.findAll({
                include: [
                    {
                        model: Client,
                        attributes: ["id", "username"],
                    },
                    {
                        model: Category,
                        attributes: ["name", "id"],
                    },
                ],
                attributes: ["id", "title", "content"],
            });
            res.json(notes);
        } catch (error) {
            res.status(500).json({ error: "Error getting all notes" });
        }
    }
        //Respose to a .pug file to reder notes.
    async renderAllNotes(req, res) {
        let notes = await this.getallNotes(req, res);
     
        res.render("index", { notes });
    }

    // SPECIFIC NOTE INFO
        //Returns a note from "id" in the req.params.
    async getSpecificNote(req, res) {
        try {
            const { id } = req.params;
            const note = await Note.findByPk(id, {
                include: [
                    {
                        model: Client,
                        attributes: ["id", "username"],
                    },
                    {
                        model: Category,
                        attributes: ["name"],
                    },
                ],
                attributes: ["id", "title", "content", "flag"],
            });
            return note;
        } catch (error) {
            res.status(500).json({ error: "Error getting specific note" });
        }
    }
        //Returns .json of a note from "id" in the req.params.
    async getSpecificNoteApi(req, res) {
        try {
            const { id } = req.params;
            const note = await Note.findByPk(id, {
                include: [
                    {
                        model: Client,
                        attributes: ["id", "username"],
                    },
                    {
                        model: Category,
                        attributes: ["id", "name"],
                    },
                ],
                attributes: ["id", "title", "content", "flag"],
            });
            res.json(note);
        } catch (error) {
            res.status(500).json({ error: "Error getting specific note" });
        }
    }
    // CATEGORY INFO
        //Returns categories .json with all categories.
    async getAllCategoriesApi(req, res) {
        console.log("llegue");
        try {
            const categories = await Category.findAll({
                attributes: ["id", "name"],
            });
            console.log(categories);
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: "Error getting all categories" });
        }
    }
        //Returns a categori from "id" in the req.params.
    async getByCategory(req, res) {
        try {
            const { id } = req.params;
            console.log(id);
            const category = await Category.findByPk(id, {
                include: [
                    {
                        model: Note,
                        attributes: [
                            "id",
                            "title",
                            "content",
                            "flag",
                            "category_id",
                        ],
                        include: [
                            {
                                model: Client,
                                attributes: [
                                    "id",
                                    "username",
                                    "name",
                                    "lastname",
                                ],
                            },
                        ],
                    },
                ],
                attributes: ["id", "name"],
            });
            if (!category) {
                throw new Error("Category not found");
            }
            return category;
        } catch (error) {
            if (error.message === "Category not found") {
                res.status(404).json({ error: "Category not found" });
            }
            res.status(500).json({ error: "Error getting notes by category" });
        }
    }
        //Returns a categori .json from "id" in the req.params.
    async getByCategoryApi(req, res) {
        try {
            const { id } = req.params;
            console.log(id);
            const category = await Category.findByPk(id, {
                include: [
                    {
                        model: Note,
                        attributes: ["id", "title", "content"],
                        include: [
                            {
                                model: Client,
                                attributes: ["id", "username"],
                            },
                        ],
                    },
                ],
                attributes: ["id", "name"],
            });
            if (!category) {
                throw new Error("Category not found");
            }
            res.json(category);
        } catch (error) {
            if (error.message === "Category not found") {
                res.status(404).json({ error: "Category not found" });
            }
            res.status(500).json({ error: "Error getting notes by category" });
        }
    }
        //Respose to a .pug file to reder categories.
    async renderByCategory(req, res) {      
        let notesAndCategoryObject = await this.getByCategory(req, res);                
     res.render("note/notecategory", { notesAndCategoryObject });
    }
   // NOTE ACTION
        //Delete any note by "id" in the req.params.
    async deleteNote(req, res) {
        try {
            const { id } = req.params;
            const note = await Note.findByPk(id);

            if (note) {
                const clientId = req.session.client.id;
                const isAdmin = req.session.client.rol === "admin";
                // Check if the user is the creator of the note or an admin
                if (note.client_id === clientId || isAdmin) {
                    await note.destroy();
                    res.redirect("/");
                } else {
                    res.status(403).json({
                        error: "You are not authorized to delete this note",
                    });
                }
            } else {
                res.status(404).json({ error: "Note not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error deleting note" });
        }
    }
        //Respose to a .pug file to reder note creation form.
    async renderCreateNote(req, res) {
        res.render("note/create");
    }
        //Create a note from the info in the form.
    async createNote(req, res) {
        try {
            let { title, content, category_id, flag } = req.body;
            let client_id = req.session.client.id;
            if (!title || !content) {
                throw new Error("Title and content are required");
            }

            const note = await Note.create({
                title,
                content,
                flag,
                client_id,
                category_id,
            });

            res.status(201).redirect("/");

            //res.status(201).json(note);
        } catch (error) {
            let errorMessage = "";
            if (error.message === "Title and content are required") {
                errorMessage = "Es necesario añadir titulo y contenido a la nota.";
                res.render("note/create", { errorMessage });
            }else{
            res.status(500).json({ error: "Error creating note" });
                const note = await Note.create({
                    title,
                    content,
                    flag,
                    client_id,
                    category_id,
                });
                res.status(201).redirect("/");            
            } catch (error) {
                res.status(500).json({ error: "Error creating note" });
            }
    }
}
// Start of one instance of the class to export to other files.
let newNoteController = new NoteController();
export default newNoteController;

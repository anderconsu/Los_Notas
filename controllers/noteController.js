import Note from "../models/note.js";
import Client from "../models/client.js";
import Category from "../models/category.js";
import session from "express-session";
import { render } from "pug";

class NoteController {
    // ALL NOTES
    async getallNotes(req, res) {
        // mix function ===
        function shuffleArray(array) {
            // Método para mezclar un array
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        // ===================
        //
        try {
            let notes = await Note.findAll({
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
                attributes: ["id", "title", "content"],
            });
            //mix all notes randomly
            notes = shuffleArray(notes);
            //res.json(notes);
            return notes;
            //return notes;
        } catch (error) {
            res.status(500).json({ error: "Error getting all notes" });
        }
    }
    async getallNotesApi(req, res) {
        // mix function ===
        function shuffleArray(array) {
            // Método para mezclar un array
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        // ===================
        //
        try {
            let notes = await Note.findAll({
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
                attributes: ["id", "title", "content"],
            });
            //mix all notes randomly
            notes = shuffleArray(notes);
            res.json(notes);
        } catch (error) {
            res.status(500).json({ error: "Error getting all notes" });
        }
    }
    async renderAllNotes(req, res) {
        let notes = await this.getallNotes(req, res);
        res.render("test/testdata", { notes });
    }

    // SPECIFIC NOTE

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
                attributes: ["id", "title", "content"],
            });
            return note;
        } catch (error) {
            res.status(500).json({ error: "Error getting specific note" });
        }
    }
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
                        attributes: ["name"],
                    },
                ],
                attributes: ["id", "title", "content"],
            });
            res.json(note);
        } catch (error) {
            res.status(500).json({ error: "Error getting specific note" });
        }
    }
    // CATEGORY
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
    async getByCategory(req, res) {
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
            return category;
        } catch (error) {
            res.status(500).json({ error: "Error getting specific note" });
        }
    }
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
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: "Error getting specific note" });
        }
    }
    async renderByCategory(req, res) {
        let notes = await this.getByCategory(req, res);
        res.render("test/testdata", { notes });
    }
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
                    res.json({ message: "Note deleted successfully" });
                } else {
                    res.status(403).json({ error: "You are not authorized to delete this note" });
                }
            } else {
                res.status(404).json({ error: "Note not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error deleting note" });
        }
    }
    async renderCreateNote(req, res) {
        res.render("note/create");
    }
    async createNote(req, res) {
            try {
                console.log(req.process.session);
                //let { title, content, category_id, flag } = req.body;
                //const client_id = req.process.session.client.id;
                //console.log(client_id);

                // const note = await Note.create({
                //     title,
                //     content,
                //     flag,
                //     client_id,
                //     category_id,
                // });

                //res.status(201).json(note);
            } catch (error) {
                res.status(500).json({ error: "Error creating note" });
            }
    }
}

let newNoteController = new NoteController();

export default newNoteController;

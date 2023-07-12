import Note from "../models/note.js";
import Client from "../models/client.js";
import Category from "../models/category.js";

class NoteController {
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
            res.json(notes);
            //return notes;
        } catch (error) {
            res.status(500).json({ error: "Error getting all notes" });
        }
    }
    async renderAllNotes(req, res) {
        let notes = await this.getallNotes(req, res);
        res.render("test/testdata", { notes });
    }

    async getSpecificNote(req, res) {
        try {
        console.log(req);
        const { id } = req.params;
        console.log(id);
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

    async getByCategory(req, res) {
        try {
            const { id } = req.params;
            console.log(id);
            const category = await Category.findByPk(id,
                {
                    include: [
                        {
                            model: Client,
                            attributes: ["id", "username"],
                        },
                        {
                            model: Note,
                            attributes: ["id", "title", "content"],
                        },
                    ],
                    attributes: ["id", "name"],
                });
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: "Error getting specific note" });
        }
    }

    // ========================= COSAS GPT DAVID =================
    createNote() {
        async (req, res) => {
            try {
                const { title, content, flag, client_id, category_id } =
                    req.body;

                const note = await Note.create({
                    title,
                    content,
                    flag,
                    client_id,
                    category_id,
                });

                res.status(201).json(note);
            } catch (error) {
                res.status(500).json({ error: "Error creating note" });
            }
        };
    }
    updateNote() {
        async (req, res) => {
            try {
                const { id } = req.params;
                const { title, content, flag, client_id, category_id } =
                    req.body;

                const note = await Note.findByPk(id);

                if (note) {
                    note.title = title;
                    note.content = content;
                    note.flag = flag;
                    note.client_id = client_id;
                    note.category_id = category_id;

                    await note.save();

                    res.json(note);
                } else {
                    res.status(404).json({ error: "Note not found" });
                }
            } catch (error) {
                res.status(500).json({ error: "Error updating note" });
            }
        };
    }
    deleteNote() {
        async (req, res) => {
            try {
                const { id } = req.params;

                const note = await Note.findByPk(id);

                if (note) {
                    await note.destroy();

                    res.sendStatus(204);
                } else {
                    res.status(404).json({ error: "Note not found" });
                }
            } catch (error) {
                res.status(500).json({ error: "Error deleting note" });
            }
        };
    }
}

let newNoteController = new NoteController();

export default newNoteController;

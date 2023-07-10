import Note from "../models/note.js";

class NoteController {
    constructor(){

    }
    createNote(){
        async (req, res) => {
            try {
                const { title, content, flag, client_id, category_id } = req.body;
        
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
        }
    }
    updateNote(){
        async (req, res) => {
            try {
                const { id } = req.params;
                const { title, content, flag, client_id, category_id } = req.body;

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
        }
    }
    deleteNote(){
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
        }
    }
}

let newNoteController = new NoteController

export default newNoteController
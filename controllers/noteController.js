
const Note = require("../models/Note.js");

// Create Note
module.exports.createNote = async (req, res) => {
    try {
        const { title, description } = req.body;

        const newNote = new Note({
            title,
            description
        });

        await newNote.save();

        res.status(201).json({
            message: "Note created successfully",
            note: newNote
        });

    } catch (err) {
        res.status(500).json({
            message: "Error creating note",
            error: err.message
        });
    }
};

// Get All Notes
module.exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({
            isTrashed: { $ne: true }
        });

        res.status(200).json({
            message: "All notes",
            notes
        });

    } catch (err) {
        res.status(500).json({
            message: "Error fetching notes",
            error: err.message
        });
    }
};

// Get Trash Notes
module.exports.getTrashNotes = async (req, res) => {
    try {
        const notes = await Note.find({
            isTrashed: true
        });

        res.status(200).json({
            message: "Trash notes",
            notes
        });

    } catch (err) {
        res.status(500).json({
            message: "Error fetching trash notes",
            error: err.message
        });
    }
};

// Update Note
module.exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const updatedNote = await Note.findOneAndUpdate(
            { _id: id, isTrashed: { $ne: true } },
            {
                title,
                description,
                updatedAt: Date.now()
            },
            { runValidators: true, new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note updated successfully",
            notes: updatedNote
        });

    } catch (err) {
        res.status(500).json({
            message: "Error updating note",
            error: err.message
        });
    }
};

// Move Note to Trash
module.exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNote = await Note.findOneAndUpdate(
            { _id: id, isTrashed: { $ne: true } },
            { isTrashed: true },
            { new: true }
        );

        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note moved to Trash",
            notes: deletedNote
        });

    } catch (err) {
        res.status(500).json({
            message: "Error moving note to Trash",
            error: err.message
        });
    }
};

// Restore Note from Trash
module.exports.restoreNote = async (req, res) => {
    try {
        const { id } = req.params;

        const restoredNote = await Note.findOneAndUpdate(
            { _id: id, isTrashed: true },
            { isTrashed: false },
            { new: true }
        );

        if (!restoredNote) {
            return res.status(404).json({
                message: "Trash note not found"
            });
        }

        res.status(200).json({
            message: "Note restored successfully",
            note: restoredNote
        });

    } catch (err) {
        res.status(500).json({
            message: "Error restoring note",
            error: err.message
        });
    }
};

// Permanently Delete Note
module.exports.permanentlyDeleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNote = await Note.findOneAndDelete({
            _id: id,
            isTrashed: true
        });

        if (!deletedNote) {
            return res.status(404).json({
                message: "Trash note not found"
            });
        }

        res.status(200).json({
            message: "Note permanently deleted",
            note: deletedNote
        });

    } catch (err) {
        res.status(500).json({
            message: "Error permanently deleting note",
            error: err.message
        });
    }
};

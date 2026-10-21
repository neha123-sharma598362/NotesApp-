
const express = require("express");
const router = express.Router();

const { createNote, getNotes, updateNote, deleteNote , getTrashNotes, restoreNote, permanentlyDeleteNote } = require("../controllers/noteController");

// Create Note
router.post("/", createNote);

// Get All Notes
router.get("/", getNotes);

// Update Note
router.put("/:id", updateNote);

// Delete Note
router.delete("/:id", deleteNote);

//Trash note
router.get("/trash", getTrashNotes);

//Restore note
router.patch("/:id/restore", restoreNote);

//Permanent deleted note
router.delete("/:id/permanent", permanentlyDeleteNote);

module.exports = router;

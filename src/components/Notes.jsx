import './Notes.css';
import NotesCard from './NoteCard';
import NoteForm from './NoteForm';
import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Notes() {
    const [showForm, setShowForm] = useState(false);
    const [editNote, setEditNote] = useState(null);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [toast, setToast] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [permanentDeleteId, setPermanentDeleteId] = useState(null);

    const [trashNotes, setTrashNotes] = useState([]);

    async function fetchNotes() {
        try {
            setLoading(true);
            setError("");

           
            const response = await axios.get(`${API_URL}/api/notes`);

            setNotes(response.data.notes);
        } catch (error) {
            console.log("Error fetching notes:", error);
            setError("Unable to load notes. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function fetchTrashNotes() {
        try {
            setLoading(true);
            setError("");

           const response = await axios.get(
    `${API_URL}/api/notes/trash`
);

            setTrashNotes(response.data.notes);
        } catch (error) {
            console.log("Error fetching trash notes:", error);
            setError("Unable to load Trash. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    function showToast(message) {
        setToast(message);

        setTimeout(() => {
            setToast("");
        }, 3000);
    }

    async function handleDelete(id) {
        try {
           await axios.delete(`${API_URL}/api/notes/${id}`);

            showToast("Note moved to Trash!");

            await fetchNotes();
        } catch (error) {
            console.log("Error moving note to Trash:", error);
            showToast("Unable to move note to Trash.");
        }
    }

    async function handleRestore(id) {
        try {
            await axios.patch(
    `http://localhost:3000/api/notes/${id}/restore`
);

            showToast("Note restored successfully!");

            await fetchTrashNotes();
            await fetchNotes();
        } catch (error) {
            console.log("Error restoring note:", error);
            showToast("Unable to restore note.");
        }
    }

    async function handlePermanentDelete(id) {
        try {
            await axios.delete(`${API_URL}/api/notes/${id}/permanent`);

            showToast("Note permanently deleted!");

            await fetchTrashNotes();
        } catch (error) {
            console.log("Error permanently deleting note:", error);
            showToast("Unable to permanently delete note.");
        }
    }

    function handleTabChange(tab) {
        setActiveTab(tab);

        if (tab === "all") {
            fetchNotes();
        } else {
            fetchTrashNotes();
        }
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <>
            {toast && (
                <div className="fixed top-5 left-1/2 z-[9999] -translate-x-1/2 rounded-lg bg-purple-500 px-6 py-3 text-white shadow-lg">
                    <i className="fa-solid fa-circle-check mr-2"></i>
                    {toast}
                </div>
            )}

            <div className="main">
                <h1 className="text-purple-600">
                    <i className="fa-solid fa-book-open"></i> NotesApp
                </h1>

                <div className="nav">
                    <ul>
                        <li
                            onClick={() => handleTabChange("all")}
                            className={activeTab === "all" ? "active" : ""}
                        >
                            <i className="fa-solid fa-house"></i> All Notes
                        </li>

                        <li onClick={() => {
                            setEditNote(null);
                            setShowForm(true);
                        }}>
                            <i className="fa-solid fa-plus"></i> Add Note
                        </li>

                        <li
                            onClick={() => handleTabChange("trash")}
                            className={activeTab === "trash" ? "active" : ""}
                        >
                            <i className="fa-solid fa-trash"></i> Trash
                        </li>
                    </ul>
                </div>
            </div>

            {loading ? (
                <p className="ml-10 mt-10 text-gray-500">
                    Loading notes...
                </p>
            ) : error ? (
                <div className="ml-10 mt-10">
                    <p className="text-red-500">{error}</p>

                    <button
                        type="button"
                        className="mt-3 rounded bg-purple-600 px-4 py-2 text-white"
                        onClick={activeTab === "all" ? fetchNotes : fetchTrashNotes}
                    >
                        Try Again
                    </button>
                </div>
            ) : activeTab === "all" ? (
                <NotesCard
                    notes={notes}
                    onAddNote={() => {
                        setEditNote(null);
                        setShowForm(true);
                    }}
                    onDeleteNote={handleDelete}
                    onEditNote={(note) => {
                        setEditNote(note);
                        setShowForm(true);
                    }}
                />
            ) : (
                <div className="notes-container">
                    <h2 className="mb-5 mt-8 text-center text-2xl font-bold text-purple-600">
                        <i className="fa-solid fa-trash mr-2"></i>
                        Trash
                    </h2>

                    {trashNotes.length === 0 ? (
                        <p className="mt-10 text-center text-gray-500">
                            Trash is empty.
                        </p>
                    ) : (
                        <div className="flex flex-wrap justify-center">
                            {trashNotes.map((note) => (
                                <div
                                    key={note._id}
                                    className="m-3 flex min-h-[220px] w-[310px] max-w-full flex-col rounded-xl border border-purple-200 bg-white p-5 shadow-md"
                                >
                                    <h3 className="mb-3 break-words text-xl font-bold text-purple-700">
                                        {note.title}
                                    </h3>

                                    <p className="mb-5 flex-1 break-words text-gray-600">
                                        {note.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleRestore(note._id)}
                                            className="rounded-lg bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700"
                                        >
                                            <i className="fa-solid fa-rotate-left mr-1"></i>
                                            Restore
                                        </button>

                                       
                                            <button
                                          type="button"
                                              onClick={() => setPermanentDeleteId(note._id)}
                                           className="rounded-lg bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700"
                                          >
                                                 <i className="fa-solid fa-trash mr-1"></i>
                                            Delete Permanently
                                                 </button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {showForm && (
                <NoteForm
                    onClose={() => setShowForm(false)}
                    onNoteSaved={async () => {
                        await fetchNotes();

                        if (activeTab === "trash") {
                            await fetchTrashNotes();
                        }
                    }}
                    editNote={editNote}
                    showToast={showToast}
                />
            )}

            
{permanentDeleteId && (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <i className="fa-solid fa-trash-can text-2xl text-purple-600"></i>
            </div>

            <h2 className="mb-2 text-xl font-bold text-gray-800">
                Delete Permanently?
            </h2>

            <p className="mb-6 text-sm text-gray-500">
                This note will be permanently deleted. You cannot recover it later.
            </p>

            <div className="flex justify-center gap-3">
                <button
                    type="button"
                    onClick={() => setPermanentDeleteId(null)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={async () => {
                        const id = permanentDeleteId;
                        setPermanentDeleteId(null);
                        await handlePermanentDelete(id);
                    }}
                    className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                >
                    Delete Permanently
                </button>
            </div>
        </div>
    </div>
)}


        </>
    );
}

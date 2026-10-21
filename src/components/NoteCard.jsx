import { useState } from "react";
import "./NoteCard.css";

export default function NotesCard({ onAddNote, notes,  onDeleteNote, onEditNote, }) {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

const filteredNotes = notes.filter((note) =>
  note.title.toLowerCase().includes(search.toLowerCase())
);
  return (
    <>
      <div className="heading">
        <h3 className="ml-10 mt-10 font-normal font-semibold text-2xl">
          My Notes
        </h3>
        <p className="ml-10 mt-1 font-light">
          Keep your thoughts, plans and ideas in one place.
        </p>
      </div>

      <form
        className="ml-4 mt-10 flex items-center gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative m-5 w-280">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>

          <input
            type="text"
            placeholder="Search note"
             value={search}
           onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-100 bg-gray-200 py-2 pl-10 pr-3 focus:outline-none"
          
         />
        </div>

        <button
          type="button"
         className="rounded bg-purple-600 p-3 text-white w-30  whitespace-nowrap"
          onClick={onAddNote}
        >
          <i className="fa-solid fa-plus pr-4"></i>
          Add Note
        </button>
      </form>

     <div className="flex flex-wrap gap-5 items-stretch">
  {filteredNotes.length > 0 ? (
    filteredNotes.map((note) => (
      <div className="card" key={note._id}>
        <h3 className="card-title">{note.title}</h3>

        <div className="list">
          <p>{note.description}</p>
        </div>

        <div className="card-actions">
          <button
            type="button"
            className="card-btn edit-btn "
            onClick={() => onEditNote(note)}
          >
            <i className="fa-solid fa-pen m-1 mr-2"></i>
            Edit
          </button>

          <button
            type="button"
            className="card-btn delete-btn"
           onClick={() => setDeleteId(note._id)}
          >
            <i className="fa-solid fa-trash m-1 mr-2"></i>
            Delete
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="ml-10 mt-6 text-gray-500">
      {search
        ? "No notes found. Try another title."
        : "No notes yet. Click Add Note to create your first note."}
    </p>
  )}
</div>
{deleteId && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-xl">
      <div className="mb-4 text-3xl text-red-500">
        <i className="fa-solid fa-trash text-purple-500"></i>
      </div>

      <h2 className="text-xl font-bold text-gray-800">
        Delete Note?
      </h2>

      <p className="mt-2 text-gray-500">
        Are you sure you want to delete this note?
      </p>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700"
          onClick={() => setDeleteId(null)}
        >
          Cancel
        </button>

        <button
          type="button"
          className="rounded-lg bg-purple-500 px-5 py-2 text-white hover:bg-purple-400"
          onClick={async () => {
            await onDeleteNote(deleteId);
            setDeleteId(null);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
}

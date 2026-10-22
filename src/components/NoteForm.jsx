 import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function NoteForm({ onClose , onNoteSaved,  editNote, showToast,}) {
 const [title, setTitle] = useState(editNote ? editNote.title : "");
const [description, setDescription] = useState(
  editNote ? editNote.description : ""
);


async function handleSubmit(e) {
  e.preventDefault();

  try {
    if (editNote) {
      await axios.put(
        `${API_URL}/api/notes/${editNote._id}`,
        { title, description }
      );
    } else {
      await axios.post(
        `${API_URL}/api/notes`,
        { title, description }
      );
    }

    await onNoteSaved();

    showToast(
      editNote
        ? "Note updated successfully!"
        : "Note created successfully!"
    );

    onClose();
  } catch (error) {
    console.log("Error saving note:", error);
  }
}

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-xl mx-auto rounded-xl border border-purple-200 bg-white p-6 shadow-xl">
          <h1 className="text-purple-600 text-2xl font-bold mt-4 text-center">
            <i className="fa-solid fa-book-open m-2"></i>
            {editNote ? "Edit Note" : "Add Note"}
          </h1>

          <p className="mt-1 font-light text-center">
            Write your thoughts, plans and ideas.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <label className="text-purple-700 font-medium text-lg m-2">
                Note Title
              </label>

              <i className="fa-solid fa-book-open m-2 absolute left-3 top-1/3 -translate-y-1/1 text-gray-600"></i>

              <input
                type="text"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-100 bg-gray-200 py-2 pl-10 pr-3 mb-3 focus:outline-none"
                required
              />

              <label className="text-purple-700 font-medium text-lg m-2">
                Add Description
              </label>

              <input
                type="text"
                placeholder="Add description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-100 bg-gray-200 py-2 pl-10 pr-3 focus:outline-none"
                required
              />
            </div>

            <div className="buttons flex justify-start gap-3 mt-3">
              <button
                type="button"
                className="rounded bg-purple-600 p-2 text-white w-30"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded bg-purple-600 p-2 text-white w-30"
              >
                <i className="fa-solid fa-bookmark"></i>
                {" "}Save Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

        </div>
      </div>
    </>
  );
}

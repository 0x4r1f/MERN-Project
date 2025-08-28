import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000/api/notes";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editing, setEditing] = useState(null);
  const [viewNote, setViewNote] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 4;

  // Fetch notes
  useEffect(() => {
    fetchNotes();
  }, [page]);

  const fetchNotes = async () => {
    const res = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    setNotes(res.data.notes);
  };

  // Add or Update note
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    if (editing) {
      await axios.put(`${API_URL}/${editing}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ title: "", content: "" });
    setEditing(null);
    fetchNotes();
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditing(note._id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure to delete this note?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchNotes();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📝 Notes Manager</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 max-w-lg mx-auto mb-10"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
        >
          {editing ? "Update Note" : "Add Note"}
        </button>
      </form>

      {/* Notes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes.map((note) => (
          <motion.div
            key={note._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow-md rounded-xl p-5 cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <p className="text-gray-600 mt-2 line-clamp-3">{note.content}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setViewNote(note)}
                className="text-sm text-blue-500 hover:underline cursor-pointer"
              >
                View
              </button>
              <div className="space-x-3">
                <button
                  onClick={() => handleEdit(note)}
                  className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-3">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition cursor-pointer"
        >
          Prev
        </button>
        <span className="px-4 py-2 bg-white rounded-lg shadow"> {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition cursor-pointer"
        >
          Next
        </button>
      </div>

      {/* Single Note Modal */}
      {viewNote && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white w-96 p-6 rounded-xl shadow-lg relative"
          >
            <h2 className="text-2xl font-bold">{viewNote.title}</h2>
            <p className="mt-3 text-gray-700">{viewNote.content}</p>
            <button
              onClick={() => setViewNote(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
            >
              ✖
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

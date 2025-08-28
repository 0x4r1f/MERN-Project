// src/components/ContactList.jsx
import { useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import ContactModal from "./ContactModal";
import ViewModal from "./ViewModal";

export default function ContactList({ contacts, refresh }) {
  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);

  const handleDelete = async (id) => {
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (res.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/contacts/${id}`);
        refresh();
        Swal.fire("Deleted!", "Contact has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Could not delete contact.", "error");
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 transition-all duration-300">
      <h2 className="text-lg font-semibold mb-4">Contact List</h2>
      {contacts.length === 0 ? (
        <p className="text-gray-500 text-sm">No contacts found.</p>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="flex justify-between items-center p-3 border rounded hover:shadow-md transition-all duration-300"
            >
              <div>
                <p className="font-semibold">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.email}</p>
                <p className="text-sm text-gray-500">{contact.phone}</p>
              </div>
              <div className="flex gap-3 text-xl">
                <FaEye
                  className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
                  onClick={() => setViewData(contact)}
                />
                <FaEdit
                  className="text-green-600 cursor-pointer hover:text-green-800 transition"
                  onClick={() => setEditData(contact)}
                />
                <FaTrash
                  className="text-red-600 cursor-pointer hover:text-red-800 transition"
                  onClick={() => handleDelete(contact._id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {editData && (
        <ContactModal
          contact={editData}
          closeModal={() => setEditData(null)}
          refresh={refresh}
        />
      )}

      {viewData && (
        <ViewModal contact={viewData} close={() => setViewData(null)} />
      )}
    </div>
  );
}

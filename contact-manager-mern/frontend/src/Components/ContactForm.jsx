import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ContactForm({ refresh }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false); // for loader

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      Swal.fire("Error", "Please fill all fields", "warning");
      return;
    }

    try {
      setLoading(true);

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await axios.post("http://localhost:5000/api/contacts", formData);

      Swal.fire("Success!", "Contact saved successfully", "success");

      setFormData({ name: "", email: "", phone: "" });
      refresh();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg p-6 rounded-md mb-6 transition-all duration-300 ease-in-out hover:shadow-xl"
    >
      <h2 className="text-xl font-semibold mb-4">Add Contact</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <button
        type="submit"
        className={`mt-4 flex items-center gap-2 bg-blue-600 text-white py-2 px-6 rounded-md transition-all duration-300 hover:bg-blue-700 ${
          loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Saving...
          </>
        ) : (
          "Save Contact"
        )}
      </button>
    </form>
  );
}

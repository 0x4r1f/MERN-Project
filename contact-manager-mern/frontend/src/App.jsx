import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import { ExportCSV, ImportCSV } from "./components/CSVTools"; // fixed case
import Swal from "sweetalert2";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const getContacts = async () => {
    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1000)); // simulate delay
      const res = await axios.get("http://localhost:5000/api/contacts");
      setContacts(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch contacts", "error");
    } finally {
      setLoading(false);
    }
  };

  //morshedgitmim&%$#@2

  // Call getContacts when component mounts
  useEffect(() => {
    getContacts();
  }, []);

  const handleImport = async (rows) => {
    try {
      for (const row of rows) {
        const { Name, Email, Phone } = row;
        if (Name && Email && Phone) {
          await axios.post("http://localhost:5000/api/contacts", {
            name: Name,
            email: Email,
            phone: Phone,
          });
        }
      }
      Swal.fire("Success", "Contacts imported successfully!", "success");
      getContacts();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Import failed", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center w-full">
            📇 Contact Manager
          </h1>
          <div className="absolute right-4 top-4">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex justify-end mb-4 gap-2">
          <ExportCSV contacts={contacts} />
          <ImportCSV onImport={handleImport} />
        </div>

        <ContactForm refresh={getContacts} />
        <SearchBar data={contacts} setFiltered={setFiltered} />

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <ContactList contacts={filtered} refresh={getContacts} />
        )}
      </div>
    </div>
  );
}

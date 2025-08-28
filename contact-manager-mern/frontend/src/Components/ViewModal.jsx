// src/components/ViewModal.jsx
export default function ViewModal({ contact, close }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-sm shadow-lg space-y-2">
        <h2 className="text-xl font-semibold mb-2">Contact Info</h2>
        <p><strong>Name:</strong> {contact.name}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
        <button
          onClick={close}
          className="mt-4 px-4 py-2 border rounded hover:bg-gray-100 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

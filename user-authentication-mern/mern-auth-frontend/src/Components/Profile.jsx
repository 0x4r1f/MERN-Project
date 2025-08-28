import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-indigo-100 via-white to-indigo-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-lg w-full text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-indigo-700">Welcome, {user.name}!</h1>
        <p className="text-gray-600 mb-8">Email: <span className="font-medium">{user.email}</span></p>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

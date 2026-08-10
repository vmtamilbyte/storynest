import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">StoryNest</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 underline"
          >
            Log out
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-4">
          <p className="text-sm text-gray-500">Welcome back,</p>
          <p className="text-lg font-medium text-gray-800">{user?.name}</p>
          <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
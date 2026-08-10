import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [userRes, storiesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/stories'),
        ]);
        setUser(userRes.data.user);
        setStories(storiesRes.data.stories);
      } catch {
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/settings')}
              className="text-sm text-gray-500 underline"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 underline"
            >
              Log out
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-4 mb-6">
          <p className="text-sm text-gray-500">Welcome back,</p>
          <p className="text-lg font-medium text-gray-800">{user?.name}</p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-700">Stories</h2>
          <button
            onClick={() => navigate('/create-story')}
            className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded-md"
          >
            + New Story
          </button>
        </div>

        {stories.length === 0 ? (
          <p className="text-sm text-gray-400">No stories yet. Be the first to publish one.</p>
        ) : (
          <div className="space-y-3">
            {stories.map((story) => (
              <div
                key={story._id}
                onClick={() => navigate(`/stories/${story._id}`)}
                className="bg-white border border-gray-200 rounded-md p-4 cursor-pointer hover:border-gray-400"
              >
                <p className="font-medium text-gray-800">{story.title}</p>
                <p className="text-sm text-gray-500 mt-1">
                  by {story.author?.name}
                </p>
                {story.genres?.length > 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    {story.genres.join(' • ')}
                  </p>
                )}
                {story.description && (
                  <p className="text-sm text-gray-600 mt-2">{story.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
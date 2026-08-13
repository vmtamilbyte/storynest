import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function MyStories() {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/stories/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStories(res.data.stories))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 pb-20">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">My Stories</h1>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-500 underline"
          >
            Back
          </button>
        </div>

        {stories.length === 0 ? (
          <p className="text-sm text-gray-400">
            You haven't published anything yet.
          </p>
        ) : (
          <div className="space-y-3">
            {stories.map((story) => (
              <div
                key={story._id}
                className="bg-white border border-gray-200 rounded-md p-4"
              >
                <p className="font-medium text-gray-800">{story.title}</p>
                <div className="flex gap-3 text-xs text-gray-400 mt-1">
                  <span>{story.views} views</span>
                  <span>{story.chapterCount} chapters</span>
                </div>
                <div className="flex gap-4 mt-3">
                  <Link
                    to={`/stories/${story._id}`}
                    className="text-sm text-gray-600 underline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/stories/${story._id}/add-chapter`}
                    className="text-sm text-gray-900 font-medium underline"
                  >
                    + Add Chapter
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyStories;
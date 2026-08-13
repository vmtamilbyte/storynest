import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          axios.get(`${import.meta.env.VITE_API_URL}/api/stories/${id}`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/stories/${id}/chapters`),
        ];

        if (token) {
          requests.push(
            axios.get(`${import.meta.env.VITE_API_URL}/api/stories/${id}/like`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          );
        }

        const results = await Promise.all(requests);
        setStory(results[0].data.story);
        setChapters(results[1].data.chapters);
        if (results[2]) setLiked(results[2].data.liked);
      } catch {
        setError('Story not found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const handleToggleLike = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/stories/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLiked(res.data.liked);
      setStory((prev) => ({
        ...prev,
        likesCount: prev.likesCount + (res.data.liked ? 1 : -1),
      }));
    } catch {
      // fail silently
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 pb-20">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-gray-500 underline mb-6"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          {story.title}
        </h1>

        <p className="text-sm text-gray-500 mb-1">by {story.author?.name}</p>

        {story.genres?.length > 0 && (
          <p className="text-xs text-gray-400 mb-4">
            {story.genres.join(' • ')}
          </p>
        )}

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleToggleLike}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border ${
              liked
                ? 'bg-red-50 border-red-300 text-red-600'
                : 'bg-white border-gray-300 text-gray-600'
            }`}
          >
            {liked ? '♥' : '♡'} {story.likesCount}
          </button>
          <span className="text-xs text-gray-400">{story.views} views</span>
          <span className="text-xs text-gray-400">{chapters.length} chapters</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-4 mb-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            {story.description || 'No description yet.'}
          </p>
        </div>

        <h2 className="text-sm font-medium text-gray-700 mb-3">Chapters</h2>

        {chapters.length === 0 ? (
          <p className="text-sm text-gray-400">No chapters published yet.</p>
        ) : (
          <div className="space-y-2">
            {chapters.map((chapter) => (
              <Link
                key={chapter._id}
                to={`/chapters/${chapter._id}`}
                className="block bg-white border border-gray-200 rounded-md p-3 hover:border-gray-400"
              >
                <p className="text-sm font-medium text-gray-800">
                  {chapter.chapterNumber}. {chapter.title}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StoryDetail;
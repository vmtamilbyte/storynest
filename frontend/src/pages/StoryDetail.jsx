import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/stories/${id}`)
      .then((res) => setStory(res.data.story))
      .catch(() => setError('Story not found'))
      .finally(() => setLoading(false));
  }, [id]);

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
    <div className="min-h-screen bg-gray-50 px-4 py-8">
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

        <p className="text-sm text-gray-500 mb-1">
          by {story.author?.name}
        </p>

        {story.author?.bio && (
          <p className="text-xs text-gray-400 mb-4">{story.author.bio}</p>
        )}

        {story.genres?.length > 0 && (
          <p className="text-xs text-gray-400 mb-4">
            {story.genres.join(' • ')}
          </p>
        )}

        <div className="flex gap-4 text-xs text-gray-400 mb-6">
          <span>{story.views} views</span>
          <span>{story.likesCount} likes</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            {story.description || 'No description yet.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StoryDetail;
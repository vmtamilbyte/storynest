import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storyRes, chaptersRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/stories/${id}`),
          axios.get(`http://localhost:5000/api/stories/${id}/chapters`),
        ]);
        setStory(storyRes.data.story);
        setChapters(chaptersRes.data.chapters);
      } catch {
        setError('Story not found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

        <p className="text-sm text-gray-500 mb-1">by {story.author?.name}</p>

        {story.genres?.length > 0 && (
          <p className="text-xs text-gray-400 mb-4">
            {story.genres.join(' • ')}
          </p>
        )}

        <div className="flex gap-4 text-xs text-gray-400 mb-6">
          <span>{story.views} views</span>
          <span>{story.likesCount} likes</span>
          <span>{chapters.length} chapters</span>
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
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChapterReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/chapters/${id}`)
      .then((res) => setChapter(res.data.chapter))
      .catch(() => setError('Chapter not found'))
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
          onClick={() => navigate(`/stories/${chapter.story?._id}`)}
          className="text-sm text-gray-500 underline mb-6"
        >
          ← Back to {chapter.story?.title}
        </button>

        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          {chapter.chapterNumber}. {chapter.title}
        </h1>

        <div className="bg-white border border-gray-200 rounded-md p-5">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {chapter.content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChapterReader;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GENRE_OPTIONS = ['Fantasy', 'Horror', 'Romance', 'Mystery', 'Adventure', 'Drama'];

function CreateStory() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const toggleGenre = (genre) => {
    setGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const token = localStorage.getItem('token');

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/stories`,
        { title, description, genres },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 pb-20">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">New Story</h1>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-500 underline"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Genres</label>
            <div className="flex flex-wrap gap-2">
              {GENRE_OPTIONS.map((genre) => (
                <button
                  type="button"
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`text-sm px-3 py-1.5 rounded-full border ${
                    genres.includes(genre)
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-600 border-gray-300'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-gray-900 text-white rounded-md py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? 'Publishing...' : 'Publish story'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateStory;
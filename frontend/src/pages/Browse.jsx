import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GENRES = ['Fantasy', 'Horror', 'Romance', 'Mystery', 'Adventure', 'Drama'];

function Browse() {
  const [search, setSearch] = useState('');
  const [activeGenre, setActiveGenre] = useState('');
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (activeGenre) params.genre = activeGenre;

    setLoading(true);
    const timeout = setTimeout(() => {
      axios
        .get('http://localhost:5000/api/stories', { params })
        .then((res) => setStories(res.data.stories))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, activeGenre]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 pb-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Browse</h1>

        <input
          type="text"
          placeholder="Search stories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveGenre('')}
            className={`text-sm px-3 py-1.5 rounded-full border ${
              activeGenre === ''
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-300'
            }`}
          >
            All
          </button>
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`text-sm px-3 py-1.5 rounded-full border ${
                activeGenre === genre
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-300'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : stories.length === 0 ? (
          <p className="text-sm text-gray-400">No stories found.</p>
        ) : (
          <div className="space-y-3">
            {stories.map((story) => (
              <Link
                key={story._id}
                to={`/stories/${story._id}`}
                className="block bg-white border border-gray-200 rounded-md p-4 hover:border-gray-400"
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;
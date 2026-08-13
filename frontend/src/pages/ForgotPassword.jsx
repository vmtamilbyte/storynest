import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetLink, setResetLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setResetLink('');

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        { email }
      );
      setMessage(res.data.message);
      if (res.data.resetLink) {
        setResetLink(res.data.resetLink);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Reset your password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white rounded-md py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>

        {message && (
          <p className="text-sm text-gray-600 text-center mt-4">{message}</p>
        )}

        {resetLink && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <p className="text-xs text-yellow-800 mb-1">
              Dev mode — no email service connected yet:
            </p>
            <Link
              to={resetLink.replace(window.location.origin, '')}
              className="text-xs text-blue-600 underline break-all"
            >
              {resetLink}
            </Link>
          </div>
        )}

        <p className="text-sm text-gray-500 text-center mt-4">
          <Link to="/login" className="text-gray-900 font-medium underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
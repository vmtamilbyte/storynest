import { Link, useLocation } from 'react-router-dom';

function BottomNav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] z-50">
         <div className="max-w-md mx-auto flex justify-around items-center py-2">
        <Link
          to="/"
          className={`flex flex-col items-center text-xs ${
            isActive('/') ? 'text-gray-900 font-medium' : 'text-gray-400'
          }`}
        >
          <span className="text-lg">⌂</span>
          Home
        </Link>
        <Link
          to="/browse"
          className={`flex flex-col items-center text-xs ${
            isActive('/browse') ? 'text-gray-900 font-medium' : 'text-gray-400'
          }`}
        >
          <span className="text-lg">⌕</span>
          Browse
        </Link>
        <Link
          to="/my-stories"
          className={`flex flex-col items-center text-xs ${
            isActive('/my-stories') ? 'text-gray-900 font-medium' : 'text-gray-400'
          }`}
        >
          <span className="text-lg">▤</span>
          Library
        </Link>
      </div>
    </div>
  );
}

export default BottomNav;
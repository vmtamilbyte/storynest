import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Settings from './pages/Settings';
import CreateStory from './pages/CreateStory';
import StoryDetail from './pages/StoryDetail';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/create-story" element={<CreateStory />} />
      <Route path="/stories/:id" element={<StoryDetail />} />
    </Routes>
  );
}

export default App;
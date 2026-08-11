import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Settings from './pages/Settings';
import CreateStory from './pages/CreateStory';
import StoryDetail from './pages/StoryDetail';
import ChapterReader from './pages/ChapterReader';
import MyStories from './pages/MyStories';
import AddChapter from './pages/AddChapter';
import Browse from './pages/Browse';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/create-story" element={<CreateStory />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
        <Route path="/chapters/:id" element={<ChapterReader />} />
        <Route path="/my-stories" element={<MyStories />} />
        <Route path="/stories/:storyId/add-chapter" element={<AddChapter />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
      <BottomNav />
    </>
  );
}

export default App;
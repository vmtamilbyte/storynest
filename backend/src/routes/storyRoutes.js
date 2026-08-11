const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createStory,
  getStories,
  getMyStories,
  getStoryById,
} = require('../controllers/storyController');

router.post('/', protect, createStory);
router.get('/', getStories);
router.get('/mine', protect, getMyStories);
router.get('/:id', getStoryById);

module.exports = router;
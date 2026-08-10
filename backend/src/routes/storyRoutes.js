const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { createStory, getStories, getStoryById } = require('../controllers/storyController');

router.post('/', protect, createStory);
router.get('/', getStories);
router.get('/:id', getStoryById);

module.exports = router;
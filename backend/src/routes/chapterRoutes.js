const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createChapter,
  getChaptersByStory,
  getChapterById,
} = require('../controllers/chapterController');

router.post('/stories/:storyId/chapters', protect, createChapter);
router.get('/stories/:storyId/chapters', getChaptersByStory);
router.get('/chapters/:id', getChapterById);

module.exports = router;
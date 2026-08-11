const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { toggleLike, getLikeStatus } = require('../controllers/likeController');

router.post('/stories/:storyId/like', protect, toggleLike);
router.get('/stories/:storyId/like', protect, getLikeStatus);

module.exports = router;
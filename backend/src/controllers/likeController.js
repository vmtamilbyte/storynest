const Like = require('../models/Like');
const Story = require('../models/Story');

exports.toggleLike = async (req, res) => {
  try {
    const { storyId } = req.params;

    const existingLike = await Like.findOne({ user: req.userId, story: storyId });

    if (existingLike) {
      await existingLike.deleteOne();
      await Story.findByIdAndUpdate(storyId, { $inc: { likesCount: -1 } });
      return res.status(200).json({ liked: false });
    }

    await Like.create({ user: req.userId, story: storyId });
    await Story.findByIdAndUpdate(storyId, { $inc: { likesCount: 1 } });
    res.status(200).json({ liked: true });
  } catch (error) {
    console.error('Toggle like error:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getLikeStatus = async (req, res) => {
  try {
    const { storyId } = req.params;
    const like = await Like.findOne({ user: req.userId, story: storyId });
    res.status(200).json({ liked: !!like });
  } catch (error) {
    console.error('Get like status error:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
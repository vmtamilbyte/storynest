const Story = require('../models/Story');

exports.createStory = async (req, res) => {
  try {
    const { title, description, coverImage, genres } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const story = await Story.create({
      title,
      description,
      coverImage,
      genres,
      author: req.userId,
    });

    res.status(201).json({ story });
  } catch (error) {
    console.error('Create story error:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .populate('author', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({ stories });
  } catch (error) {
    console.error('Get stories error:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate('author', 'name bio');

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    story.views += 1;
    await story.save();

    res.status(200).json({ story });
  } catch (error) {
    console.error('Get story error:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
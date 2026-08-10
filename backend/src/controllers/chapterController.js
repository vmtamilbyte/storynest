const Chapter = require('../models/Chapter');
const Story = require('../models/Story');

exports.createChapter = async (req, res) => {
  try {
    const { storyId } = req.params;
    const { title, content, chapterNumber } = req.body;

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    if (story.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only the author can add chapters' });
    }

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const chapter = await Chapter.create({
      story: storyId,
      title,
      content,
      chapterNumber: chapterNumber || story.chapterCount + 1,
    });

    story.chapterCount += 1;
    await story.save();

    res.status(201).json({ chapter });
  } catch (error) {
    console.error('Create chapter error:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getChaptersByStory = async (req, res) => {
  try {
    const chapters = await Chapter.find({ story: req.params.storyId })
      .select('title chapterNumber createdAt')
      .sort({ chapterNumber: 1 });

    res.status(200).json({ chapters });
  } catch (error) {
    console.error('Get chapters error:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id).populate('story', 'title author');

    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    res.status(200).json({ chapter });
  } catch (error) {
    console.error('Get chapter error:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
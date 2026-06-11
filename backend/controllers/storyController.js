import Story from '../models/Story.js';
import { asyncHandler, NotFoundError } from '../utils/errors.js';
import { paginateWithCount } from '../utils/pagination.js';

// @desc    Get stories — paginated, filterable
// @route   GET /api/stories
export const getStories = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.exhibitionId) filter.exhibitionId = req.query.exhibitionId;

  if (!req.admin) {
    filter.status = 'published';
  } else if (req.query.status) {
    filter.status = req.query.status;
  }

  const result = await paginateWithCount(Story, filter, req);
  res.json(result);
});

// @desc    Get story by ID
// @route   GET /api/stories/:id
export const getStoryById = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id)
    .populate('exhibitionId', 'title')
    .lean();

  if (!story) throw new NotFoundError('Story');
  res.json(story);
});

// @desc    Create story (admin/guide)
// @route   POST /api/admin/stories
export const createStory = asyncHandler(async (req, res) => {
  const story = await Story.create({
    ...req.body,
    createdBy: req.admin._id,
  });
  res.status(201).json(story);
});

// @desc    Update story (admin/guide)
// @route   PUT /api/admin/stories/:id
export const updateStory = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);
  if (!story) throw new NotFoundError('Story');

  Object.assign(story, req.body);
  await story.save();
  res.json(story);
});

// @desc    Delete story (admin only)
// @route   DELETE /api/admin/stories/:id
export const deleteStory = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);
  if (!story) throw new NotFoundError('Story');
  await Story.findByIdAndDelete(req.params.id);
  res.json({ message: 'Story removed' });
});

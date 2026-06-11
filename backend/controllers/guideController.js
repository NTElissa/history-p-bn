import Guide from '../models/Guide.js';
import { asyncHandler, NotFoundError } from '../utils/errors.js';
import { paginateWithCount } from '../utils/pagination.js';

// @desc    Get all guides — paginated, filterable
// @route   GET /api/guides
export const getGuides = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === 'true';
  if (req.query.language) {
    filter.languages = { $in: [req.query.language] };
  }

  // For public requests, only show active guides
  if (!req.admin) {
    filter.isActive = true;
  }

  const result = await paginateWithCount(Guide, filter, req);
  res.json(result);
});

// @desc    Get guide by ID
// @route   GET /api/guides/:id
export const getGuideById = asyncHandler(async (req, res) => {
  const guide = await Guide.findById(req.params.id).lean();
  if (!guide) throw new NotFoundError('Guide');
  res.json(guide);
});

// @desc    Create guide (admin)
// @route   POST /api/admin/guides
export const createGuide = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.imageUrl = `/uploads/${req.file.filename}`;
  }
  if (typeof data.languages === 'string') {
    data.languages = data.languages.split(',').map((l) => l.trim());
  }
  if (typeof data.specializations === 'string') {
    data.specializations = data.specializations.split(',').map((s) => s.trim());
  }
  const guide = await Guide.create(data);
  res.status(201).json(guide);
});

// @desc    Update guide (admin)
// @route   PUT /api/admin/guides/:id
export const updateGuide = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.imageUrl = `/uploads/${req.file.filename}`;
  }
  if (typeof data.languages === 'string') {
    data.languages = data.languages.split(',').map((l) => l.trim());
  }
  if (typeof data.specializations === 'string') {
    data.specializations = data.specializations.split(',').map((s) => s.trim());
  }
  const guide = await Guide.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!guide) throw new NotFoundError('Guide');
  res.json(guide);
});

// @desc    Delete guide (admin)
// @route   DELETE /api/admin/guides/:id
export const deleteGuide = asyncHandler(async (req, res) => {
  const guide = await Guide.findByIdAndDelete(req.params.id);
  if (!guide) throw new NotFoundError('Guide');
  res.json({ message: 'Guide removed' });
});

import Booking from '../models/Booking.js';
import Guide from '../models/Guide.js';
import { asyncHandler, NotFoundError, ValidationError, ConflictError } from '../utils/errors.js';
import { paginateWithCount } from '../utils/pagination.js';
import { sendBookingConfirmation } from '../utils/email.js';

// @desc    Create a booking (public)
// @route   POST /api/bookings
export const createBooking = asyncHandler(async (req, res) => {
  const { guideId, visitorName, visitorEmail, date, time, groupSize } = req.body;

  if (!guideId || !visitorName || !visitorEmail || !date || !time) {
    throw new ValidationError('Guide, name, email, date, and time are required');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(visitorEmail)) {
    throw new ValidationError('Invalid email format');
  }

  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (bookingDate < today) {
    throw new ValidationError('Booking date cannot be in the past');
  }

  const size = Number(groupSize) || 1;
  if (size < 1 || size > 50) {
    throw new ValidationError('Group size must be between 1 and 50');
  }

  // Check for guide conflicts (same guide, same date + overlapping time)
  const existingBooking = await Booking.findOne({
    guideId,
    date: bookingDate,
    time,
    status: { $in: ['pending', 'confirmed'] },
  });

  if (existingBooking) {
    throw new ConflictError('This guide is already booked at the requested date and time');
  }

  const booking = await Booking.create({
    ...req.body,
    visitorName: visitorName.trim(),
    visitorEmail: visitorEmail.toLowerCase().trim(),
    groupSize: size,
  });

  // Send confirmation email (non-blocking)
  const guide = await Guide.findById(guideId).lean();
  sendBookingConfirmation(booking, guide).catch(err => {
    console.error('Failed to send booking confirmation email:', err.message);
  });

  res.status(201).json(booking);
});

// @desc    Get all bookings — paginated, filterable
// @route   GET /api/admin/bookings
export const getBookings = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.guideId) filter.guideId = req.query.guideId;

  // Date range filter
  if (req.query.from || req.query.to) {
    filter.date = {};
    if (req.query.from) filter.date.$gte = new Date(req.query.from);
    if (req.query.to) filter.date.$lte = new Date(req.query.to);
  }

  const result = await paginateWithCount(Booking, filter, req);

  // Populate guide info
  const populatedData = await Booking.populate(result.data, {
    path: 'guideId',
    select: 'name imageUrl',
  });

  res.json({ ...result, data: populatedData });
});

// @desc    Update booking status
// @route   PUT /api/admin/bookings/:id
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status, rejectionReason } = req.body;
  const validStatuses = ['pending', 'confirmed', 'rejected', 'cancelled', 'completed'];

  if (!validStatuses.includes(status)) {
    throw new ValidationError(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  const update = { status };
  if (status === 'rejected' && rejectionReason) {
    update.rejectionReason = rejectionReason;
  }
  if (status === 'confirmed') {
    update.confirmationSentAt = new Date();
  }

  const booking = await Booking.findByIdAndUpdate(req.params.id, update, { new: true })
    .populate('guideId', 'name');

  if (!booking) throw new NotFoundError('Booking');

  // Send confirmation email if confirmed
  if (status === 'confirmed') {
    const guide = await Guide.findById(booking.guideId).lean();
    sendBookingConfirmation(booking, guide).catch(err => {
      console.error('Failed to send booking confirmation email:', err.message);
    });
  }

  res.json(booking);
});

// @desc    Cancel booking by reference number + email (public)
// @route   POST /api/bookings/cancel
export const cancelBooking = asyncHandler(async (req, res) => {
  const { referenceNumber, email } = req.body;

  if (!referenceNumber || !email) {
    throw new ValidationError('Reference number and email are required');
  }

  const booking = await Booking.findOne({
    referenceNumber: referenceNumber.trim().toUpperCase(),
    visitorEmail: email.toLowerCase().trim(),
  });

  if (!booking) throw new NotFoundError('Booking');

  if (['cancelled', 'completed'].includes(booking.status)) {
    throw new ValidationError(`Booking is already ${booking.status}`);
  }

  booking.status = 'cancelled';
  await booking.save();

  res.json({ message: 'Booking cancelled successfully', booking });
});

// @desc    Delete booking (admin)
// @route   DELETE /api/admin/bookings/:id
export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) throw new NotFoundError('Booking');
  res.json({ message: 'Booking removed' });
});

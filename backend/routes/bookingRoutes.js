import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { createBooking, getBookings, updateBookingStatus, cancelBooking, deleteBooking } from '../controllers/bookingController.js';

const publicRouter = express.Router();
const adminRouter = express.Router();

// Public
publicRouter.post('/', createBooking);
publicRouter.post('/cancel', cancelBooking);

// Admin (protected)
adminRouter.get('/', protect, getBookings);
adminRouter.put('/:id', protect, updateBookingStatus);
adminRouter.delete('/:id', protect, deleteBooking);

export { publicRouter, adminRouter };

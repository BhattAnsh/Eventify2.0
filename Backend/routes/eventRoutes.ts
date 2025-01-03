import express from 'express';
import { eventController } from '../controllers/eventController';
const router = express.Router();

// GET all events
router.get('/', eventController.getAllEvents as any);

// GET single event by ID
router.get('/:id', eventController.getEventById as any );

// POST new event
router.post('/', eventController.createEvent as any);

// PUT update event
router.put('/:id', eventController.updateEvent as any);


// DELETE event
router.delete('/:id', eventController.deleteEvent as any);

export default router;

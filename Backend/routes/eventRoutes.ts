import express from 'express';
import { eventController } from '../controllers/eventController';

const router = express.Router();

// GET all events
router.get('/', eventController.getEvent);

// GET single event by ID 
router.get('/:id', eventController.getEvent);

// POST new event
router.post('/', eventController.createEvent);

// PUT update event
router.put('/:id', eventController.updateEvent);

// DELETE event
router.delete('/:id', eventController.deleteEvent);

export default router;

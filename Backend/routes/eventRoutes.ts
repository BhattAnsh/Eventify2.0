import express from 'express';
import { eventController } from '../controllers/eventController';
const router = express.Router();

// GET all events
router.get('/create', eventController.createEvent as any);


export default router;

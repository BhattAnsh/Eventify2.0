import { Request, Response, NextFunction } from 'express';
import Event from '../models/Event';
import { clerkClient } from '@clerk/express';

// Mock function to simulate database operations
const someAsyncFunctionToGetEvent = async (id: string) => {
    // Simulate fetching an event by ID
    return { id, name: "Sample Event" };
};

const someAsyncFunctionToCreateEvent = async (data: any) => {
    // Simulate creating an event
    return { id: "newId", ...data };
};

const someAsyncFunctionToUpdateEvent = async (id: string, data: any) => {
    // Simulate updating an event
    return { id, ...data };
};

const someAsyncFunctionToDeleteEvent = async (id: string) => {
    // Simulate deleting an event
    return { id };
};

export const eventController = {
  // Create a new event
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const event = new Event({
        ...req.body,
        createdBy: (req as any).user?._id, // Type assertion to handle user property
      });
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  },

  // Get all events
  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await Event.find()
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 });
      res.json(events);
    } catch (error) {
      next(error);
    }
  },

  // Get single event
  async getEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await someAsyncFunctionToGetEvent(req.params.id);
      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  },

  // Update event
  async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedEvent = await someAsyncFunctionToUpdateEvent(req.params.id, req.body);
      res.status(200).json(updatedEvent);
    } catch (error) {
      next(error);
    }
  },

  // Delete event
  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedEvent = await someAsyncFunctionToDeleteEvent(req.params.id);
      res.status(200).json(deletedEvent);
    } catch (error) {
      next(error);
    }
  },

  // Join event
  async joinEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      if (event.attendees.includes((req as any).user?._id)) {
        return res.status(400).json({ message: 'Already joined this event' });
      }

      if (event.attendees.length >= event.capacity) {
        return res.status(400).json({ message: 'Event is at full capacity' });
      }

      event.attendees.push((req as any).user?._id);
      await event.save();
      res.json(event);
    } catch (error) {
      next(error);
    }
  },
};

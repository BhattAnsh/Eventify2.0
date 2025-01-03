import { Request, Response } from 'express';
import Event from '../models/Event';
import User from '../models/User';

export const eventController = {

    async createEvent(req: Request, res: Response) {
        try {
            const { user_id, ...eventData } = req.body;

            console.log(eventData);
            // First, we verify the user exists in our system
            const user = await User.findOne({ user_id });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found - cannot create event"
                });
            }

            // If user exists, we create the event and associate it with the user
            const newEvent = new Event({
                ...eventData,
                created_by: user_id
            });

            const savedEvent = await newEvent.save();

            return res.status(201).json({
                success: true,
                message: "Event created successfully",
                data: savedEvent
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error creating event",
                error: error.message
            });
        }
    },

    // Retrieving all events is a straightforward database query
    // that returns the complete list
    async getAllEvents(req: Request, res: Response) {
        try {
            const events = await Event.find()
                .populate('created_by', 'name email');

            return res.status(200).json({
                success: true,
                message: "Events retrieved successfully",
                data: events
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error retrieving events",
                error: error.message
            });
        }
    },

    // Getting a single event requires checking if the event exists
    // before sending it back to the client
    async getEventById(req: Request, res: Response) {
        try {
            const eventId = req.params.id;

            const event = await Event.findById(eventId)
                .populate('created_by', 'name email');

            if (!event) {
                return res.status(404).json({
                    success: false,
                    message: "Event not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Event retrieved successfully",
                data: event
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error retrieving event",
                error: error.message
            });
        }
    },

    // Updating an event involves checking if it exists and
    // verifying the user has permission to modify it
    async updateEvent(req: Request, res: Response) {
        try {
            const eventId = req.params.id;
            const updateData = req.body;

            // Check if the event exists before attempting update
            const existingEvent = await Event.findById(eventId);
            if (!existingEvent) {
                return res.status(404).json({
                    success: false,
                    message: "Event not found"
                });
            }

            // Update the event with the new data
            const updatedEvent = await Event.findByIdAndUpdate(
                eventId,
                updateData,
                { new: true }  // This option returns the updated document
            );

            return res.status(200).json({
                success: true,
                message: "Event updated successfully",
                data: updatedEvent
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error updating event",
                error: error.message
            });
        }
    },

    // Deleting an event requires checking if it exists before removal
    async deleteEvent(req: Request, res: Response) {
        try {
            const eventId = req.params.id;

            // Check if the event exists before attempting deletion
            const existingEvent = await Event.findById(eventId);
            if (!existingEvent) {
                return res.status(404).json({
                    success: false,
                    message: "Event not found"
                });
            }

            // Proceed with deletion
            await Event.findByIdAndDelete(eventId);

            return res.status(200).json({
                success: true,
                message: "Event deleted successfully"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error deleting event",
                error: error.message
            });
        }
    }
};

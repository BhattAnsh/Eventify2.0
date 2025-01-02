import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import eventRoutes from './routes/eventRoutes';
import authRoutes from './routes/authRoutes';
import 'dotenv/config';
import webhookRoute from './routes/webHookRoutes';
import { clerkMiddleware, requireAuth } from '@clerk/express';
const app = express();

// Middleware
app.use(clerkMiddleware());
app.use(cors());
app.use('/api/webhooks', webhookRoute );
app.use(express.json());

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/auth', requireAuth(), authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/Eventify")
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

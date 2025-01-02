import "dotenv/config";
import express from 'express';
import { webhookController } from '../controllers/webhookController';
import { requireAuth } from '@clerk/express';
import { Test } from '../controllers/testController';
const router = express.Router();

router.post('/register', express.raw({ type: "application/json" }),webhookController.test as any );
router.get('/test', Test as any );

export default router;

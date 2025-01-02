import express from 'express';
import { webhookController } from '../controllers/webhookController';
const router = express.Router();

router.post('/test', webhookController.test as any)

export default router;

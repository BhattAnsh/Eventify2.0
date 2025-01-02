import "dotenv/config";
import express from 'express';
import { Authenticate } from '../controllers/webhookController';
import { Test } from '../controllers/testController';
const router = express.Router();

router.post('/register', express.raw({ type: "application/json" }),Authenticate.test as any );
router.get('/test', Test as any );

export default router;

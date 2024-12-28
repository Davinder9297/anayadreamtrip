import express from 'express';
import { register, login } from '../controllers/authController.js';
import uploaddocs from '../middleware/uploadMiddleware.js';
import { checkUserBlockedOnLogin } from '../middleware/adminMiddlware.js';

const router = express.Router();

router.post('/register',uploaddocs, register);
router.post('/login',checkUserBlockedOnLogin, login);

export default router;

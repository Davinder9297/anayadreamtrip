import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import {  checkUserBlockedOnLogin } from '../middleware/adminMiddlware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login',checkUserBlockedOnLogin, loginUser);

export default router;

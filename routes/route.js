import express from 'express'
import { addUser, login } from '../controller/controller.js';
const router = express.Router()

// Create user
router.post('/create-user',addUser)

// Login
router.post('/login',login)

export default router;
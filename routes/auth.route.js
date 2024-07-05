import express from 'express'
import { login, register } from '../controllers/auth.controller.js';
import {body} from 'express-validator';

const router = express.Router();

router.post ("/register",[
    body('email', "formato de email incorrecto").isEmail().normalizeEmail()
], register);
router.post ("/login", login);  

export default router;
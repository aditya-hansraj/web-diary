import express, { Request, Response } from 'express';
import { register, login } from '../controllers/auth';
var router = express.Router();

router.post('/login', login);

router.post('/register', register);

export default router;  
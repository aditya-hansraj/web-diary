import express, { Request, Response } from 'express';
import { register, login, logout, getUser } from '../controllers/auth';
import passport from 'passport';
var router = express.Router();

router.post('/login', login);

router.post('/logout', logout);

router.post('/register', register);

router.get('/user', passport.authenticate('session'), getUser);

export default router;  
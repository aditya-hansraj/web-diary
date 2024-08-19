import express, { Request, Response } from 'express';
import { register, login, logout, getUser, changeUsername, changePassword, changeEmail } from '../controllers/auth';
import passport from 'passport';
import authenticateJWT from '../middlewares/auth';
var router = express.Router();

router.post('/login', login);

router.post('/logout', logout);

router.post('/register', register);

router.get('/me', passport.authenticate('session'), getUser);

router.put('/user/change-username',authenticateJWT, changeUsername);

router.put('/user/change-password', authenticateJWT, changePassword);

router.put('/user/change-email', authenticateJWT, changeEmail);

export default router;  
require('dotenv').config();

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import router from './routes/auth'
import session from 'express-session';
import passport from './config/passport';
import authRoutes from './routes/auth';
import diaryEntryRoutes from './routes/diaryEntry';

const app = express();
const PORT = 5000;
const secret = String(process.env.SECRET_KEY);

app.use(express.json());

app.use('/uploads', express.static('uploads')); 

app.use(session({
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3 * 24 * 60 * 60 * 1000 } 
}));

app.use(passport.initialize());
app.use(passport.session());

// AuthRoutes
app.use('/api/auth', authRoutes);
app.use('/api/entries', diaryEntryRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('The Web-Diary');
});

mongoose.connect(process.env.MONGODB_URI as string)
.then(() => {
  console.log('Connected to Database !')
  app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}/`);
  });
})
.catch(err => console.error(err));
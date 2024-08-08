import express from 'express';
import upload from '../config/multer';
import { createDiaryEntry } from '../controllers/diaryEntry';
import isAuthenticated from '../middlewares/auth';

const router = express.Router();

router.post('/create',isAuthenticated, upload.array('files', 10), createDiaryEntry);

export default router;  

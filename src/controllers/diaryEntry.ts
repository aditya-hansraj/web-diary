import { Request, Response } from 'express';
import UserType from '../types/user'; // Adjust import according to your file structure
import DiaryEntry from '../models/DiaryEntry';

export const createDiaryEntry = async (req: Request, res: Response) => {
  try {
    const { title, body, tags } = req.body;
    const files = req.files as Express.Multer.File[];

    const user = req.user as UserType;

    if (!user || !user._id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const filePaths = files.map(file => ({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size
    }));

    const newEntry = new DiaryEntry({
      title,
      body,
      tags: tags.split(',').map((tag: string) => tag.trim()),
      files: filePaths,
      date: new Date(),
      user_id: user._id,
    });

    await newEntry.save();

    res.status(201).json({ message: 'Diary entry created successfully', entry: newEntry });
  } catch (err: Error | any) {
    res.status(500).json({ error: err.message });
  }
};

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

mongoose.connect('mongodb://localhost:27017/diary')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

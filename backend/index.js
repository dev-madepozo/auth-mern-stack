import express from 'express';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import { connectDB } from './db/connectDB.js';

import authRoutes from './routes/auth.route.js';

const __dirname = path.resolve();

dotenv.config();

const app = express()
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  })
}

app.listen(PORT, () => {
  connectDB();
  console.log('Server is running on port:', PORT)
});

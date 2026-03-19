import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import contactRoutes from './routes/contact.js';
import aiRoutes from './routes/ai.js';
import projectRoutes from './routes/projects.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/api/contact', contactRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/projects', projectRoutes);

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

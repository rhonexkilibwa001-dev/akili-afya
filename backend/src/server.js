import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import postsRouter from './routes/posts.js';

const app = express();
const port = Number(process.env.PORT) || 5000;
const allowedOrigins = process.env.FRONTEND_ORIGIN
  ? process.env.FRONTEND_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
  : process.env.NODE_ENV === 'production'
    ? []
    : ['http://localhost:5173'];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      const error = new Error('This origin is not allowed by the API CORS policy.');
      error.status = 403;
      return callback(error);
    },
  }),
);
app.use(express.json({ limit: '16kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});
app.use('/api/posts', postsRouter);
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});
app.use((error, _req, res, _next) => {
  console.error('API request failed:', error);
  const status = Number.isInteger(error.status) ? error.status : 500;
  res.status(status).json({ error: status >= 500 ? 'Internal server error.' : error.message });
});

async function start() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI must be set before starting the API.');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, '0.0.0.0', () => {
    console.log(`Akili Afya API listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start API:', error);
  process.exitCode = 1;
});

import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import authenticate from '../middleware/authenticate.js';
import User from '../models/User.js';

const router = Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many sign-in or sign-up attempts. Please try again in 15 minutes.' },
});

function createToken(userId) {
  return jwt.sign({}, process.env.AUTH_TOKEN_SECRET, {
    subject: String(userId),
    issuer: 'akili-afya-api',
    audience: 'akili-afya',
    expiresIn: '7d',
  });
}

function respondWithAccount(res, user, status = 200) {
  return res.status(status).json({
    token: createToken(user._id),
    user: { id: String(user._id), displayName: user.displayName },
  });
}

router.post('/register', authLimiter, async (req, res, next) => {
  const displayName = typeof req.body?.displayName === 'string' ? req.body.displayName.trim() : '';
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  if (displayName.length < 2 || displayName.length > 60) {
    return res.status(400).json({ error: 'Display name must be between 2 and 60 characters.' });
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }
  if (password.length < 10 || password.length > 128) {
    return res.status(400).json({ error: 'Password must be between 10 and 128 characters.' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ displayName, email, passwordHash });
    return respondWithAccount(res, user, 201);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }
    return next(error);
  }
});

router.post('/login', authLimiter, async (req, res, next) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  try {
    const user = await User.findOne({ email }).select('+passwordHash');
    const passwordMatches = user
      ? await bcrypt.compare(password, user.passwordHash)
      : await bcrypt.compare(password || 'invalid-password', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYFydq7UtDr8r6Z9c5h4xQ6zD7e1M9eK');

    if (!user || !passwordMatches) {
      return res.status(401).json({ error: 'Email or password is incorrect.' });
    }
    return respondWithAccount(res, user);
  } catch (error) {
    return next(error);
  }
});

router.get('/me', authenticate, async (req, res) => {
  res.json({ user: { id: req.user.id, displayName: req.user.displayName } });
});

export default router;

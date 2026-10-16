import { Router } from 'express';
import mongoose from 'mongoose';
import authenticate from '../middleware/authenticate.js';
import Post from '../models/Post.js';

const router = Router();

function serializePost({ _id, comments, ...post }) {
  delete post.authorId;
  return {
    id: String(_id),
    ...post,
    comments: comments.map(({ _id: commentId, authorId, ...comment }) => ({
        id: String(commentId),
        ...comment,
      })),
  };
}

router.get('/', async (_req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(100).lean();
    res.json(posts.map(serializePost));
  } catch (error) {
    next(error);
  }
});

router.get('/mine', authenticate, async (req, res, next) => {
  try {
    const posts = await Post.find({ authorId: req.user.id }).sort({ createdAt: -1 }).limit(100).lean();
    res.json(posts.map(serializePost));
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, async (req, res, next) => {
  const title = typeof req.body?.title === 'string' ? req.body.title.trim() : '';
  const body = typeof req.body?.body === 'string' ? req.body.body.trim() : '';

  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required.' });
  }
  if (title.length > 120 || body.length > 5000) {
    return res.status(400).json({ error: 'Title or body exceeds the allowed length.' });
  }

  try {
    const post = await Post.create({
      author: req.user.displayName,
      authorId: req.user.id,
      title,
      body,
    });
    res.status(201).json(serializePost(post.toObject()));
  } catch (error) {
    next(error);
  }
});

router.post('/:id/comments', authenticate, async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id.' });
  }

  const text = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
  if (!text) {
    return res.status(400).json({ error: 'Reply text is required.' });
  }
  if (text.length > 1000) {
    return res.status(400).json({ error: 'Reply exceeds the allowed length.' });
  }

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    post.comments.push({
      author: req.user.displayName,
      authorId: req.user.id,
      text,
    });
    await post.save();
    res.status(201).json(serializePost(post.toObject()));
  } catch (error) {
    next(error);
  }
});

export default router;

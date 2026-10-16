import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async function authenticate(req, res, next) {
  const authorization = req.get('Authorization') || '';
  const [scheme, token] = authorization.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Please log in to continue.' });
  }

  try {
    const payload = jwt.verify(token, process.env.AUTH_TOKEN_SECRET, {
      issuer: 'akili-afya-api',
      audience: 'akili-afya',
    });
    const user = await User.findById(payload.sub).select('displayName');
    if (!user) {
      return res.status(401).json({ error: 'Your account is no longer available. Please log in again.' });
    }

    req.user = { id: String(user._id), displayName: user.displayName };
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Your session has expired. Please log in again.' });
    }
    return next(error);
  }
}

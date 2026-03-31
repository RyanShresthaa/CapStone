const path = require('path');
const dns = require('dns');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mongoose = require('mongoose');
const axios = require('axios');

const User = require('./models/User');
const Trek = require('./models/Trek');
const Booking = require('./models/Booking');
const ForumPost = require('./models/ForumPost');
const Feedback = require('./models/Feedback');
const authMiddleware = require('./middleware/authMiddleware');
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const { handleValidation } = require('./middleware/validation');
const { TREK_IMAGES } = require('./data/trekImages');
const { importTreks } = require('./lib/trekImport');

const app = express();

const CLIENT_ORIGINS = (process.env.CLIENT_URL || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
app.use(
  cors({
    origin: CLIENT_ORIGINS.length ? CLIENT_ORIGINS : true,
    credentials: true,
  })
);
app.use(express.json());

const authRoutesLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
});
const feedbackLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});
const adminTrekImportLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
});

function requireAdminApiKey(req, res, next) {
  const key = (process.env.ADMIN_API_KEY || '').trim();
  if (!key) {
    return res.status(503).json({
      message: 'Bulk trek import is disabled. Set ADMIN_API_KEY in .env to enable.',
    });
  }
  const sent = req.headers['x-admin-key'];
  if (!sent || sent !== key) {
    return res.status(401).json({ message: 'Invalid or missing X-Admin-Key header.' });
  }
  next();
}

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
process.env.JWT_SECRET = JWT_SECRET;
const BUDGET_PRICE = { Low: '$699', Medium: '$999', High: '$1,299' };

function avgReviewRating(reviews) {
  if (!reviews?.length) return 4.5;
  const s = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
  return Math.round((s / reviews.length) * 10) / 10;
}

function serializeTrek(doc) {
  const o = doc.toObject ? doc.toObject() : { ...doc };
  const id = o._id ? String(o._id) : String(o.id);
  const rating = avgReviewRating(o.reviews);
  const images = o.image
    ? [o.image, o.image, o.image]
    : [
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80',
      ];
  const map =
    o.coordinates?.latitude != null && o.coordinates?.longitude != null
      ? { lat: o.coordinates.latitude, lng: o.coordinates.longitude }
      : { lat: 27.9881, lng: 86.925 };

  return {
    ...o,
    id,
    location: o.region ? `${o.region}, Nepal` : o.location || 'Nepal',
    rating,
    price: BUDGET_PRICE[o.budget] || '$999',
    images,
    map,
    weatherLocation: o.weatherLocation || o.name,
  };
}

function serializeUserPublic(u) {
  if (!u) return null;
  const o = u.toObject ? u.toObject() : u;
  return {
    id: o._id ? String(o._id) : o.id,
    firstName: o.firstName,
    lastName: o.lastName,
    email: o.email,
    name: `${o.firstName} ${o.lastName}`,
    profilePicture: o.profilePicture,
    bio: o.bio,
    experienceLevel: o.experienceLevel,
    completedTreks: o.totalTreksCompleted ?? o.completedTreks?.length ?? 0,
    phoneNumber: o.phoneNumber,
    location: o.location,
    preferredDifficulty: o.preferredDifficulty,
    consentGiven: o.consentGiven,
  };
}

function signToken(user) {
  return jwt.sign(
    { userId: String(user._id), email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

async function getUserFromTokenPayload(payload) {
  if (!payload?.userId) return null;
  return User.findById(payload.userId).select('-passwordHash');
}

// —— Auth ——
app.post(
  '/register',
  authRoutesLimiter,
  [
    body('firstName').trim().notEmpty().isLength({ max: 80 }).withMessage('First name required'),
    body('lastName').trim().notEmpty().isLength({ max: 80 }).withMessage('Last name required'),
    body('email').trim().isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6, max: 128 }).withMessage('Password must be 6–128 characters'),
  ],
  handleValidation,
  async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      passwordHash,
      experienceLevel: 'Beginner',
    });

    const token = signToken(user);
    res.status(201).json({ token, user: serializeUserPublic(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post(
  '/login',
  loginLimiter,
  [
    body('email').trim().isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').notEmpty().isLength({ max: 128 }).withMessage('Password required'),
  ],
  handleValidation,
  async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    user.lastLogin = new Date();
    await user.save();

    const token = signToken(user);
    res.json({ token, user: serializeUserPublic(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post(
  '/forgot-password',
  authRoutesLimiter,
  [body('email').trim().isEmail().normalizeEmail().withMessage('Valid email required')],
  handleValidation,
  async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    const generic = { message: 'If an account exists for that email, you can reset your password using the link or token sent.' };

    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpiry = new Date(Date.now() + 60 * 60 * 1000);
      await user.save();
      if (process.env.NODE_ENV !== 'production') {
        return res.json({
          ...generic,
          resetToken: token,
          message: 'Password reset token generated! Use it with reset-password (dev only).',
        });
      }
    }
    res.json(generic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/auth/verify-reset-token/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpiry: { $gt: new Date() },
    });
    if (!user) return res.status(400).json({ valid: false, message: 'Invalid or expired token' });
    res.json({ valid: true, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post(
  '/reset-password',
  authRoutesLimiter,
  [
    body('token').trim().isLength({ min: 16, max: 256 }).withMessage('Invalid reset token'),
    body('newPassword').isLength({ min: 6, max: 128 }).withMessage('Password must be 6–128 characters'),
  ],
  handleValidation,
  async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: new Date() },
    });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// —— Treks (search / featured before :id) ——
/** Bulk import treks: POST JSON { "treks": [...], "mode": "skip" | "replace" } with header X-Admin-Key */
app.post(
  '/api/admin/treks/import',
  adminTrekImportLimiter,
  requireAdminApiKey,
  async (req, res) => {
    try {
      const body = req.body || {};
      const rows = Array.isArray(body.treks) ? body.treks : Array.isArray(body) ? body : null;
      if (!rows) {
        return res.status(400).json({ message: 'Body must be { treks: [...] } or a JSON array.' });
      }
      const mode = body.mode === 'replace' ? 'replace' : 'skip';
      const result = await importTreks(rows, { mode });
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message || 'Import failed' });
    }
  }
);

app.get('/api/treks/featured', async (req, res) => {
  try {
    const docs = await Trek.find({ featured: true }).limit(12).lean();
    const list = docs.length ? docs : await Trek.find().limit(6).lean();
    res.json(list.map((d) => serializeTrek(d)));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load treks' });
  }
});

app.get('/api/treks/search', async (req, res) => {
  try {
    const { query, difficulty, budget } = req.query;
    const filter = {};
    if (difficulty) filter.difficulty = difficulty;
    if (budget) filter.budget = budget;
    if (query) {
      const q = String(query).trim();
      filter.$or = [
        { name: new RegExp(q, 'i') },
        { region: new RegExp(q, 'i') },
        { tags: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
      ];
    }
    const docs = await Trek.find(filter).limit(50).lean();
    res.json(docs.map((d) => serializeTrek(d)));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Search failed' });
  }
});

app.get('/api/treks/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Trek not found' });
    }
    const doc = await Trek.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ message: 'Trek not found' });
    res.json(serializeTrek(doc));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load trek' });
  }
});

app.get('/api/treks', async (req, res) => {
  try {
    const docs = await Trek.find().limit(100).lean();
    res.json(docs.map((d) => serializeTrek(d)));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load treks' });
  }
});

app.get('/api/recommendations', async (req, res) => {
  try {
    let list = await Trek.find({ featured: true }).limit(4).lean();
    if (!list.length) list = await Trek.find().limit(4).lean();

    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const raw = authHeader.split(' ')[1];
        const decoded = jwt.verify(raw, JWT_SECRET);
        const user = await getUserFromTokenPayload(decoded);
        if (user?.preferredDifficulty) {
          const match = await Trek.find({ difficulty: user.preferredDifficulty }).limit(4).lean();
          if (match.length) list = match;
        }
      } catch {
        /* optional auth */
      }
    }
    res.json({ recommendations: list.map((d) => serializeTrek(d)) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load recommendations' });
  }
});

// —— Protected user ——
app.get('/api/user/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(serializeUserPublic(user));
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/user/profile', authMiddleware, async (req, res) => {
  try {
    const allowed = [
      'firstName',
      'lastName',
      'bio',
      'phoneNumber',
      'location',
      'experienceLevel',
      'preferredDifficulty',
      'profilePicture',
    ];
    const updates = {};
    for (const k of allowed) {
      if (req.body[k] !== undefined) updates[k] = req.body[k];
    }
    const user = await User.findByIdAndUpdate(req.user.userId, { $set: updates }, { new: true }).select(
      '-passwordHash'
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(serializeUserPublic(user));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
});

app.get('/api/user/wishlist', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('wishlist.trekId');
    if (!user) return res.status(404).json({ message: 'User not found' });
    const out = (user.wishlist || []).map((w) => ({
      trekId: w.trekId?._id ? String(w.trekId._id) : String(w.trekId),
      plannedDate: w.plannedDate,
      notes: w.notes,
      trek: w.trekId && w.trekId.name ? serializeTrek(w.trekId) : null,
    }));
    res.json(out);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load wishlist' });
  }
});

app.post('/api/user/wishlist', authMiddleware, async (req, res) => {
  try {
    const { trekId, plannedDate, notes } = req.body;
    if (!trekId || !mongoose.isValidObjectId(trekId)) {
      return res.status(400).json({ message: 'Valid trekId required' });
    }
    const trek = await Trek.findById(trekId);
    if (!trek) return res.status(404).json({ message: 'Trek not found' });

    const user = await User.findById(req.user.userId);
    const exists = user.wishlist.some((w) => String(w.trekId) === String(trekId));
    if (exists) return res.status(400).json({ message: 'Already in wishlist' });

    user.wishlist.push({
      trekId,
      plannedDate: plannedDate ? new Date(plannedDate) : undefined,
      notes: notes || '',
    });
    await user.save();
    res.status(201).json({ message: 'Added to wishlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add wishlist item' });
  }
});

app.delete('/api/user/wishlist/:trekId', authMiddleware, async (req, res) => {
  try {
    const { trekId } = req.params;
    await User.findByIdAndUpdate(req.user.userId, {
      $pull: { wishlist: { trekId } },
    });
    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to remove' });
  }
});

// —— Bookings ——
app.post('/api/bookings', authMiddleware, async (req, res) => {
  try {
    const {
      trek: trekId,
      startDate,
      endDate,
      numberOfPeople,
      accommodationType,
      specialRequirements,
      totalAmount,
      depositAmount,
      emergencyContact,
      customerNotes,
    } = req.body;

    if (!trekId || !startDate || !endDate || !numberOfPeople || !accommodationType) {
      return res.status(400).json({ message: 'Missing required booking fields' });
    }
    if (!emergencyContact?.name || !emergencyContact?.relationship || !emergencyContact?.phone) {
      return res.status(400).json({ message: 'Emergency contact is required' });
    }

    const trek = await Trek.findById(trekId);
    if (!trek) return res.status(404).json({ message: 'Trek not found' });

    const start = new Date(startDate);
    const end = new Date(endDate);
    const total = Number(totalAmount) || 0;
    const deposit = Number(depositAmount) || Math.round(total * 0.2);

    const booking = await Booking.create({
      user: req.user.userId,
      trek: trekId,
      startDate: start,
      endDate: end,
      numberOfPeople: Number(numberOfPeople),
      accommodationType,
      specialRequirements,
      totalAmount: total,
      depositAmount: deposit,
      emergencyContact,
      customerNotes,
      paymentMethod: 'Credit Card',
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Booking failed' });
  }
});

app.get('/api/user/bookings', authMiddleware, async (req, res) => {
  try {
    const list = await Booking.find({ user: req.user.userId }).populate('trek').sort({ createdAt: -1 });
    res.json(
      list.map((b) => ({
        id: String(b._id),
        ...b.toObject(),
        trek: b.trek ? serializeTrek(b.trek) : null,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load bookings' });
  }
});

app.get('/api/bookings/:id', authMiddleware, async (req, res) => {
  try {
    const b = await Booking.findById(req.params.id).populate('trek');
    if (!b) return res.status(404).json({ message: 'Not found' });
    if (String(b.user) !== String(req.user.userId)) return res.status(403).json({ message: 'Forbidden' });
    res.json({ id: String(b._id), ...b.toObject(), trek: b.trek ? serializeTrek(b.trek) : null });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/bookings/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const b = await Booking.findById(req.params.id);
    if (!b) return res.status(404).json({ message: 'Not found' });
    if (String(b.user) !== String(req.user.userId)) return res.status(403).json({ message: 'Forbidden' });
    b.status = 'Cancelled';
    b.cancellationReason = req.body.cancellationReason || '';
    b.cancelledAt = new Date();
    await b.save();
    res.json({ message: 'Booking cancelled', booking: b });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// —— Forum ——
function serializePost(p) {
  const o = p.toObject ? p.toObject() : p;
  const author = o.author;
  const authorName =
    author?.firstName != null ? `${author.firstName} ${author.lastName}` : 'Member';
  return {
    id: String(o._id),
    title: o.title,
    content: o.content,
    category: o.category || 'general-discussion',
    author: authorName,
    authorAvatar: '🧗',
    date: o.createdAt ? o.createdAt.toISOString().slice(0, 10) : '',
    replies: (o.comments || []).length,
    likes: o.likes || 0,
    views: Math.max(1, (o.comments?.length || 0) * 3 + 10),
    tags: [],
    comments: (o.comments || []).map((c) => ({
      id: String(c._id),
      content: c.content,
      author: c.author?.firstName != null ? `${c.author.firstName} ${c.author.lastName}` : 'Member',
      createdAt: c.createdAt,
    })),
  };
}

app.get('/api/forum/posts', async (req, res) => {
  try {
    const posts = await ForumPost.find().sort({ createdAt: -1 }).limit(100).populate('author').populate('comments.author');
    res.json(posts.map(serializePost));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load posts' });
  }
});

app.post('/api/forum/posts', authMiddleware, async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Title and content required' });
    const post = await ForumPost.create({
      author: req.user.userId,
      title,
      content,
      category: category || 'general-discussion',
    });
    const populated = await ForumPost.findById(post._id).populate('author');
    res.status(201).json(serializePost(populated));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

app.post('/api/forum/posts/:postId/comments', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Content required' });
    const post = await ForumPost.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.comments.push({ author: req.user.userId, content });
    await post.save();
    const populated = await ForumPost.findById(post._id).populate('author').populate('comments.author');
    res.json(serializePost(populated));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

app.post('/api/forum/posts/:postId/like', authMiddleware, async (req, res) => {
  try {
    const post = await ForumPost.findByIdAndUpdate(
      req.params.postId,
      { $inc: { likes: 1 } },
      { new: true }
    )
      .populate('author')
      .populate('comments.author');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(serializePost(post));
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/forum/posts/:postId/badge', authMiddleware, async (req, res) => {
  try {
    const { badge } = req.body;
    if (!badge) return res.status(400).json({ message: 'badge required' });
    const post = await ForumPost.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.badges = post.badges || [];
    post.badges.push(badge);
    await post.save();
    const populated = await ForumPost.findById(post._id).populate('author').populate('comments.author');
    res.json(serializePost(populated));
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// —— Feedback ——
app.post(
  '/api/feedback',
  feedbackLimiter,
  [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1–5'),
    body('comment').optional().trim().isLength({ max: 2000 }),
    body('trek').optional().trim().isLength({ max: 64 }),
  ],
  handleValidation,
  async (req, res) => {
  try {
    const { rating, comment, trek } = req.body;
    const authHeader = req.headers.authorization;
    let userId;
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
        userId = decoded.userId;
      } catch {
        /* guest feedback */
      }
    }
    await Feedback.create({
      user: userId,
      rating,
      comment,
      trek: trek && mongoose.isValidObjectId(trek) ? trek : undefined,
    });
    res.status(201).json({ message: 'Feedback submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/feedback', authMiddleware, async (req, res) => {
  try {
    const list = await Feedback.find().populate('trek').sort({ createdAt: -1 }).limit(200);
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// —— Weather ——
app.get('/api/weather', async (req, res) => {
  const location = req.query.location || 'Kathmandu';
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (apiKey) {
    try {
      const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: { q: `${location},NP`, appid: apiKey, units: 'metric' },
        timeout: 8000,
      });
      return res.json({
        weather: {
          name: data.name || location,
          temperature: data.main?.temp,
          condition: data.weather?.[0]?.main || '—',
          humidity: data.main?.humidity,
          description: data.weather?.[0]?.description,
        },
      });
    } catch (e) {
      console.warn('OpenWeather error, using fallback:', e.message);
    }
  }

  res.json({
    weather: {
      name: location,
      temperature: 18,
      condition: 'Partly cloudy',
      humidity: 62,
      description: 'Add OPENWEATHER_API_KEY to .env for live data',
    },
  });
});

// —— Consent / 2FA stubs ——
app.get('/api/consent', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId).select('consentGiven consentDate');
  res.json({ consentGiven: user?.consentGiven || false, consentDate: user?.consentDate });
});

app.post('/api/consent', authMiddleware, async (req, res) => {
  const { consentGiven } = req.body;
  await User.findByIdAndUpdate(req.user.userId, {
    consentGiven: !!consentGiven,
    consentDate: consentGiven ? new Date() : null,
  });
  res.json({ message: 'Consent updated', consentGiven: !!consentGiven });
});

app.post('/api/enable-2fa', authMiddleware, (req, res) => {
  res.json({ message: 'Two-factor authentication is not enabled yet (placeholder).', enabled: false });
});

app.post('/api/verify-2fa', authMiddleware, (req, res) => {
  res.json({ message: '2FA verification not required for this build.', ok: true });
});

// —— Dashboard summary ——
async function dashboardHandler(req, res) {
  try {
    const user = await User.findById(req.user.userId).select('-passwordHash');
    const bookings = await Booking.find({ user: req.user.userId }).sort({ createdAt: -1 }).limit(5).populate('trek');
    const trekCount = await Trek.countDocuments();
    res.json({
      message: 'Welcome back — here is your NepGo snapshot.',
      user: serializeUserPublic(user),
      stats: {
        totalUsers: await User.countDocuments(),
        activeUsers: trekCount,
        recentActivity: bookings.map((b) => ({
          type: 'booking',
          label: b.trek?.name || 'Trek',
          date: b.startDate,
        })),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load dashboard' });
  }
}

app.get('/api/dashboard', authMiddleware, dashboardHandler);
app.get('/dashboard', authMiddleware, dashboardHandler);

app.get('/', (req, res) => {
  res.json({ message: 'NepGo API is running!', mongo: mongoose.connection.readyState === 1 });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  const uri = (process.env.MONGO_URI || '').trim();
  if (!uri) {
    console.error('MONGO_URI is required in .env to start the server');
    process.exit(1);
  }
  const mongoOptions = {
    serverSelectionTimeoutMS: 15_000,
  };

  // Windows / some networks: system DNS fails mongodb+srv SRV lookups; Node can use public resolvers instead.
  if (
    uri.startsWith('mongodb+srv://') &&
    !/^false|0$/i.test(String(process.env.MONGO_USE_PUBLIC_DNS || 'true').trim())
  ) {
    const servers = (process.env.MONGO_DNS_SERVERS || '8.8.8.8,1.1.1.1')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    try {
      dns.setServers(servers);
      console.log(`DNS for SRV: ${servers.join(', ')} (set MONGO_USE_PUBLIC_DNS=false to use system DNS)`);
    } catch (e) {
      console.warn('Could not set DNS servers:', e.message);
    }
  }

  mongoose
    .connect(uri, mongoOptions)
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message || err);
      const isQuerySrv = /querySrv/i.test(String(err.syscall || err.message || ''));
      if (err.code === 'ENOTFOUND' && isQuerySrv) {
        console.error(`
→ querySrv ENOTFOUND: there is no SRV record for this Atlas host. That almost always means:

  • The hostname in MONGO_URI is wrong, or the cluster was deleted/renamed, or you pasted an old string.
  • Fix: MongoDB Atlas → your Project → Database → your Cluster → Connect → Drivers → copy a NEW connection string (replace .env entirely).

  Also use the "standard connection string" (mongodb://host1:27017,host2:27017,...) if Atlas shows it — no SRV lookup required.
  Local dev: MONGO_URI=mongodb://127.0.0.1:27017/nepgo
`);
      } else if (err.code === 'ECONNREFUSED' && isQuerySrv) {
        console.error(`
→ querySrv ECONNREFUSED: DNS could not reach a resolver (VPN, firewall, or blocked DNS).

  Try: non-SRV mongodb://... URI from Atlas, or MONGO_DNS_SERVERS / fix network, or local MongoDB (see .env.example).
`);
      }
      process.exit(1);
    });
}

module.exports = app;

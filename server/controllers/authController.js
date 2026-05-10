import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

// ── Generate JWT Token ────────────────────────────────
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ── REGISTER ──────────────────────────────────────────
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      logger.warn('Registration failed - User already exists', { email });
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    logger.success('New user registered', { userId: user._id, email });

    return res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    logger.error('Register error', { message: err.message });

    return res.status(500).json({
      success: false,
      message: err.message || 'Server Error'
    });
  }
};

// ── LOGIN ─────────────────────────────────────────────
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn('Login failed - User not found', { email });
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      logger.warn('Login failed - Wrong password', { email });
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    logger.success('User logged in', { userId: user._id, email });

    return res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    logger.error('Login error', { message: err.message });
    return res.status(500).json({
      success: false,
      message: err.message || 'Server Error'
    });
  }
};

// ── GET ME ────────────────────────────────────────────
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    logger.info('User profile fetched', { userId: req.user._id });
    return res.json({ success: true, user });

  } catch (err) {
    logger.error('GetMe error', { message: err.message });
    return res.status(500).json({
      success: false,
      message: err.message || 'Server Error'
    });
  }
};
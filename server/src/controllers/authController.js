const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const sanitizeUser = (user) => {
  const object = user.toObject();
  delete object.password;
  return object;
};

const register = async (req, res, next) => {
  try {
    const { email, password, name, age, gender, isAdultConfirmed } = req.body;

    if (age < 18 || !isAdultConfirmed) {
      return res.status(400).json({ message: 'You must be 18+ and confirm adulthood.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      age,
      gender,
      isAdultConfirmed,
      photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'],
    });
    const token = signToken(user._id);
    return res.status(201).json({ user: sanitizeUser(user), token });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = signToken(user._id);
    return res.json({ user: sanitizeUser(user), token });
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res) => {
  return res.json({ message: 'Logged out' });
};

const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login, logout, me };

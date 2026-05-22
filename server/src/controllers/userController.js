const User = require('../models/User');
const { containsAbusiveContent } = require('../utils/moderation');

const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const lowInfoWarning = !user.bio || user.photos.length < 1 || user.interests.length < 2;
    return res.json({ user, lowInfoWarning });
  } catch (error) {
    return next(error);
  }
};

const updateMe = async (req, res, next) => {
  try {
    const blockedFields = ['password', 'email'];
    blockedFields.forEach((field) => delete req.body[field]);

    if (containsAbusiveContent(req.body.bio || '')) {
      return res.status(400).json({ message: 'Bio contains disallowed content' });
    }

    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password -email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

module.exports = { me, updateMe, getById };

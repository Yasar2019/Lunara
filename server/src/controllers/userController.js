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
    if (containsAbusiveContent(req.body.bio || '')) {
      return res.status(400).json({ message: 'Bio contains disallowed content' });
    }

    const allowedFields = [
      'name',
      'age',
      'gender',
      'interestedIn',
      'bio',
      'location',
      'photos',
      'interests',
      'relationshipGoal',
      'vibeTags',
      'prompts',
      'verified',
    ];

    const user = await User.findById(req.user._id);
    allowedFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        user[field] = req.body[field];
      }
    });
    await user.save();

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

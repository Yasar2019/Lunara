const mongoose = require('mongoose');
const Match = require('../models/Match');
const User = require('../models/User');
const { calculateCompatibility } = require('../utils/compatibility');
const { buildConversationStarters } = require('../utils/conversationStarters');

const isInterested = (me, candidate) => {
  if (!me.interestedIn || me.interestedIn === 'everyone') return true;
  return String(candidate.gender).toLowerCase() === String(me.interestedIn).toLowerCase();
};

const getDiscovery = async (req, res, next) => {
  try {
    const ageMin = Number(req.query.ageMin || 18);
    const ageMax = Number(req.query.ageMax || 100);
    const me = await User.findById(req.user._id);

    const excluded = [
      me._id,
      ...me.likedUsers,
      ...(me.superLikedUsers || []),
      ...me.passedUsers,
      ...me.blockedUsers,
    ];

    const candidates = await User.find({
      _id: { $nin: excluded },
      age: { $gte: ageMin, $lte: ageMax },
      blockedUsers: { $ne: me._id },
    }).limit(50);

    const profile = candidates.find((candidate) => isInterested(me, candidate)) || null;

    if (!profile) {
      return res.json({ profile: null });
    }

    const compatibility = calculateCompatibility(me, profile);
    const starters = buildConversationStarters(me, profile);
    return res.json({ profile, compatibility, starters });
  } catch (error) {
    return next(error);
  }
};

const createMatchIfMutual = async (userId, targetId) => {
  const target = await User.findById(targetId);
  const likedBack =
    target?.likedUsers?.some((id) => id.toString() === userId.toString()) ||
    target?.superLikedUsers?.some((id) => id.toString() === userId.toString());

  if (!likedBack) return null;

  const [a, b] = [userId, targetId].map((id) => new mongoose.Types.ObjectId(id)).sort((x, y) =>
    x.toString().localeCompare(y.toString())
  );

  let match = await Match.findOne({ users: { $all: [a, b] } });
  if (!match) {
    match = await Match.create({ users: [a, b] });
  }
  return match;
};

const like = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id);
    const targetId = req.params.id;

    if (me._id.toString() === targetId) {
      return res.status(400).json({ message: 'Cannot like yourself' });
    }

    if (!me.likedUsers.some((id) => id.toString() === targetId)) {
      me.likedUsers.push(targetId);
    }
    me.passedUsers = me.passedUsers.filter((id) => id.toString() !== targetId);
    await me.save();

    const match = await createMatchIfMutual(me._id, targetId);
    return res.json({ message: 'Liked', match });
  } catch (error) {
    return next(error);
  }
};

const pass = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id);
    const targetId = req.params.id;

    if (!me.passedUsers.some((id) => id.toString() === targetId)) {
      me.passedUsers.push(targetId);
      await me.save();
    }

    return res.json({ message: 'Passed' });
  } catch (error) {
    return next(error);
  }
};

const superLike = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id);
    const targetId = req.params.id;

    if (me._id.toString() === targetId) {
      return res.status(400).json({ message: 'Cannot super-like yourself' });
    }

    if (!me.superLikedUsers.some((id) => id.toString() === targetId)) {
      me.superLikedUsers.push(targetId);
    }
    if (!me.likedUsers.some((id) => id.toString() === targetId)) {
      me.likedUsers.push(targetId);
    }
    me.passedUsers = me.passedUsers.filter((id) => id.toString() !== targetId);
    await me.save();

    const match = await createMatchIfMutual(me._id, targetId);
    return res.json({ message: 'Super liked', match, isSuperLike: true });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getDiscovery, like, pass, superLike };

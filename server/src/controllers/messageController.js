const Match = require('../models/Match');
const Message = require('../models/Message');
const { containsAbusiveContent } = require('../utils/moderation');

const ensureMatchMembership = async (userId, matchId) => {
  const match = await Match.findById(matchId);
  if (!match) return null;
  const allowed = match.users.some((id) => id.toString() === userId.toString());
  return allowed ? match : null;
};

const listMessages = async (req, res, next) => {
  try {
    const match = await ensureMatchMembership(req.user._id, req.params.matchId);
    if (!match) {
      return res.status(403).json({ message: 'No access to this chat' });
    }

    const messages = await Message.find({ matchId: match._id }).sort({ createdAt: 1 });
    return res.json({ messages });
  } catch (error) {
    return next(error);
  }
};

const sendMessage = async (req, res, next) => {
  try {
    const match = await ensureMatchMembership(req.user._id, req.params.matchId);
    if (!match) {
      return res.status(403).json({ message: 'No access to this chat' });
    }

    const text = String(req.body.text || '').trim();
    if (!text) {
      return res.status(400).json({ message: 'Message text is required' });
    }
    if (containsAbusiveContent(text)) {
      return res.status(400).json({ message: 'Message contains disallowed content' });
    }

    const receiver = match.users.find((id) => id.toString() !== req.user._id.toString());
    const message = await Message.create({
      matchId: match._id,
      sender: req.user._id,
      receiver,
      text,
    });

    return res.status(201).json({ message });
  } catch (error) {
    return next(error);
  }
};

module.exports = { listMessages, sendMessage };

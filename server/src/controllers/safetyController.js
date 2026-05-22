const Report = require('../models/Report');
const User = require('../models/User');
const { containsAbusiveContent } = require('../utils/moderation');

const reportUser = async (req, res, next) => {
  try {
    const { reason, details } = req.body;
    if (!reason) {
      return res.status(400).json({ message: 'Reason is required' });
    }
    if (containsAbusiveContent(`${reason} ${details || ''}`)) {
      return res.status(400).json({ message: 'Report contains disallowed content' });
    }

    const report = await Report.create({
      reporter: req.user._id,
      reportedUser: req.params.userId,
      reason,
      details,
    });

    return res.status(201).json({ report });
  } catch (error) {
    return next(error);
  }
};

const blockUser = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id);
    const userId = req.params.userId;

    if (!me.blockedUsers.some((id) => id.toString() === userId)) {
      me.blockedUsers.push(userId);
      me.passedUsers.push(userId);
      await me.save();
    }

    return res.json({ blockedUsers: me.blockedUsers });
  } catch (error) {
    return next(error);
  }
};

const listBlocked = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id).populate('blockedUsers', 'name age photos');
    return res.json({ blockedUsers: me.blockedUsers });
  } catch (error) {
    return next(error);
  }
};

module.exports = { reportUser, blockUser, listBlocked };

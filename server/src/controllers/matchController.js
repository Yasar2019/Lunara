const Match = require('../models/Match');

const listMatches = async (req, res, next) => {
  try {
    const matches = await Match.find({ users: req.user._id })
      .populate('users', 'name age photos verified bio interests vibeTags')
      .sort({ createdAt: -1 });
    return res.json({ matches });
  } catch (error) {
    return next(error);
  }
};

const getMatchById = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id).populate('users', 'name age photos verified');
    if (!match || !match.users.some((user) => user._id.toString() === req.user._id.toString())) {
      return res.status(404).json({ message: 'Match not found' });
    }

    return res.json({ match });
  } catch (error) {
    return next(error);
  }
};

module.exports = { listMatches, getMatchById };

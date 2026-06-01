const express = require('express');
const { listMatches, getMatchById } = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, listMatches);
router.get('/:id', protect, getMatchById);

module.exports = router;

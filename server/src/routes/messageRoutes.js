const express = require('express');
const { listMessages, sendMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:matchId', protect, listMessages);
router.post('/:matchId', protect, sendMessage);

module.exports = router;

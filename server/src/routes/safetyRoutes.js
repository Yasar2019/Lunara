const express = require('express');
const { reportUser, blockUser, listBlocked } = require('../controllers/safetyController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/report/:userId', protect, reportUser);
router.post('/block/:userId', protect, blockUser);
router.get('/blocked', protect, listBlocked);

module.exports = router;

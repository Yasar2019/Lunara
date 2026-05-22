const express = require('express');
const { me, updateMe, getById } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', protect, me);
router.put('/me', protect, updateMe);
router.get('/:id', protect, getById);

module.exports = router;

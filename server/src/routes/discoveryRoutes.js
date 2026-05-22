const express = require('express');
const { getDiscovery, like, pass, superLike } = require('../controllers/discoveryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getDiscovery);
router.post('/like/:id', protect, like);
router.post('/pass/:id', protect, pass);
router.post('/superlike/:id', protect, superLike);

module.exports = router;

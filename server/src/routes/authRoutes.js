const express = require('express');
const { body } = require('express-validator');
const { register, login, logout, me } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateMiddleware');
const { loginRateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 2 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('age').isInt({ min: 18 }),
    body('gender').notEmpty(),
    body('isAdultConfirmed').custom((value) => value === true || value === 'true'),
  ],
  validateRequest,
  register
);

router.post('/login', loginRateLimiter, [body('email').isEmail(), body('password').notEmpty()], validateRequest, login);
router.post('/logout', logout);
router.get('/me', protect, me);

module.exports = router;

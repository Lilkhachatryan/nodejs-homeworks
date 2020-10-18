const { register, login } = require('../controllers/auth');
const router = require('express').Router();

router.post('/login', login);
router.post('/register', register);

module.exports = router;

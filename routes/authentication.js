const router = require('express').Router();
const { register, login, logout } = require('../controllers/authentication');

router.post('/register', register);

router.post('/', login);

// router.get('/logout', logout);

module.exports = router;
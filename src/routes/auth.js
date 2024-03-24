const express = require('express');
const router = express.Router();
const { userRegister, loginUser } = require('../controllers/auth');

router.post('/resgister', userRegister)
router.post('/login', loginUser)

module.exports = router;

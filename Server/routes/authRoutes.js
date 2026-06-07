const express = require('express')
const router = express.Router()
const { login, refresh, logout, register } = require('../controllers/authController')

const loginLimiter = require('../middleware/loginLimiter')


router.route('/register')
    .post(register)
router.route('/login')
    .post(loginLimiter, login)

router.route('/refresh')
    .get(refresh)

router.route('/logout')
    .post(logout)

module.exports = router
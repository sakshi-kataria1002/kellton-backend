const express = require('express')
const router = express.Router()
const AuthController = require('../controller/auth-controller')

// USER AUTHENTICATION
router.post('/signup', AuthController.signUp)
router.post('/signin', AuthController.signIn)
router.get('/getAllUsers', AuthController.getAllUsers)

module.exports = router

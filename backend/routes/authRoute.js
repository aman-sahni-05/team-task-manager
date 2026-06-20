const { register,login } = require('../controllers/authController.js')
const { Router } = require('express')
const router = Router();

router.post('/register',register) //POST - REGISTER

router.post('/login', login) //POST - LOGIN


module.exports = router;
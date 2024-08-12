const express=require('express')
const { createUser, login } = require('../controllers/userController')
const auth = require('../middlewares/auth')
const router=express.Router()

router.post('/create',createUser)
router.post('/auth',login)

module.exports=router
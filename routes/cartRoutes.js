const express=require('express')
const { addToCart, getCart, deleteCart } = require('../controllers/cartController')
const auth = require('../middlewares/auth')
const router=express.Router()

router.post('/add',auth,addToCart)
router.get("/get",auth,getCart)
router.post('/delete/:id',auth,deleteCart)

module.exports=router
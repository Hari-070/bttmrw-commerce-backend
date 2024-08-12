const productController = require('../controllers/productController')
const express=require('express')
const router=express.Router()
const auth=require('../middlewares/auth')

router.get('/',auth,productController.getProduct)
router.post('/',auth,productController.createProducts)


module.exports=router
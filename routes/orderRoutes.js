const express=require('express')
const auth = require('../middlewares/auth')
const { postOrder, getOrder, deleteOrder } = require('../controllers/orderController')
const router = express.Router()

router.post('/create',auth,postOrder)
router.get('/get',auth,getOrder)
router.delete('/delete',auth,deleteOrder)

module.exports=router
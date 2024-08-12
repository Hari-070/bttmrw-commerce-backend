const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
    user_id: String,
    products:[{
        product_id:{
            type:String,
        },
        quantity:{
            type:Number
        }
    }]
})

const Cart=mongoose.model("cart",cartSchema)
module.exports=Cart
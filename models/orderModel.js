// const mongoose=require('mongoose')

// const orderSchema=new mongoose.Schema({
//     user_id:String,
//     customer:{
//         name:String,
//         phNumber:Number,
//         address: String,
//         email: String
//     },
//     products:[{
//         id:String,
//         title:String,
//         price:Number,
//         category:String,
//         image:String,
//         quantity:Number
//     }],
//     orderDate:Date,
//     EstDate: Date
// })

// const Order=new mongoose.model("order",orderSchema)
// module.exports=Order



const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    user_id:String,
    customer:{
        name:String,
        phNumber:Number,
        address: String,
        email: String
    },
    products:[{
        product_id:String,
        quantity:Number
    }],
    orderDate:Date,
    EstDate: Date
})

const Order=new mongoose.model("order",orderSchema)
module.exports=Order
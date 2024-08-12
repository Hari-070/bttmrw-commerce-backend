const mongoose= require('mongoose')

const productSchema=new mongoose.Schema({
    id:String,
    title:String,
    description:String,
    price:Number,
    category: String,
    image:String,
    rating:[{
        count:Number,
        rate:Number
    }]
})

const Product=new mongoose.model("products",productSchema)
module.exports=Product

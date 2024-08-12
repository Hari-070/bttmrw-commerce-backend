const Product=require('../models/productModel.js')
const { v4: uuidv4 } = require('uuid');

exports.getProduct=async (req,res)=>{
    try {
        const products=await Product.find()
        res.send(products)
    } catch (error) {
        console.error(error)
    }
}

exports.createProducts=async (req,res)=>{
    try {
        const {title,description,price,category,image,rating}=req.body
        const data=new Product({
            id:uuidv4(),
            title,
            description,
            price,
            category,
            image,
            rating
        })
        await data.save()
        res.send(data)

    } catch (error) {
        console.log(error)
    }
}
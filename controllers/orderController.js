const Cart = require("../models/cartModel")
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel")

exports.postOrder=async(req,res)=>{
    
    try {
    
        const {user_id}=req.user;
        const{name,phNumber,address}=req.body
        const user=await User.findOne({_id:user_id})
        if(!user){
            return res.status(400).json("UserDoesn't exist")
        }
        const cart=await Cart.findOne({user_id})
        if(!cart){
            return res.status(400).json("there is no cart in this id")
        }
        const estDate=new Date()
        estDate.setDate(estDate.getDate()+10);
        // const productss=await Promise.all(cart.products.map(async(item)=>{
        //     const cartP=await Product.findOne({_id:item.product_id})
        //     return{
        //         id:item.product_id,
        //         title:cartP.title,
        //         price:cartP.price,
        //         category:cartP.category,
        //         image:cartP.image,
        //         quantity:item.quantity
        //     }
        // }))
        // console.log(productss)

        const order=new Order({
            user_id,
            customer:{
                name,
                phNumber,
                address,
                email: user.email
            },
            products:cart.products,
            orderDate: new Date().getDate(),
            EstDate: estDate
        })
        await order.save()
        res.status(200).json(order)
    } catch (error) {
        console.log(error);
        
    }
}

exports.getOrder=async(req,res)=>{
    try {
        const {user_id}=req.user
        var order=await Order.findOne({user_id})
        if(!order){
            return res.status(400).json("order not found")
        }
        const pro=await Promise.all(order.products.map(async(item)=>{
            const prod=await Product.findOne({_id:item.product_id})
            return{
                id:item.product_id,
                title:prod.title,
                price:prod.price,
                category:prod.category,
                image:prod.image,
                quantity:item.quantity
            }
        }))
        order=order.toObject();
        order.products=pro
        res.status(200).json(order)
    } catch (error) {
        console.log(error);
        
    }
}

exports.deleteOrder=async(req,res)=>{
    try {
        const {user_id}=req.user
        const order=await User.findOneAndDelete({user_id})
        res.status(200).json(order)
    } catch (error) {
        console.log(error);
        
    }
}
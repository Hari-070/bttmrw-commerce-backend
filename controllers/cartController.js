const Cart = require("../models/cartModel")
const Product = require("../models/productModel")

exports.addToCart=async(req,res)=>{
    const {user_id}=req.user
   const {product_id,quantity}=req.body
   

   try {
    const cart=await Cart.findOne({user_id})

   if(!cart){
    const newCart=new Cart({
        user_id,
        products:[{
            product_id,
            quantity
        }]
    })
    await newCart.save()
    return res.status(201).json({message:"Cart created successfully"})
   }

   const existingproduct=cart.products.findIndex(
    (prod)=> prod.product_id === product_id
   )
   if(existingproduct==-1){
    cart.products.push({product_id,quantity})
   }
   else{
    cart.products[existingproduct].quantity=quantity
   }
   await cart.save()
   res.status(200).json({message:"product has been added in cart successfully"})
    
   } catch (error) {
    console.log(error)
   }
}

exports.getCart= async (req,res)=>{
    try {
        const {user_id}=req.user
        const user=await Cart.findOne({user_id})
        if(!user){
            return res.status(401).json({message:"Create a cart"})
        }
        var subTotal=0
        const array=await Promise.all(user.products.map(async(item)=>{
              const single=await Product.findOne({_id:item.product_id})
              subTotal+=item.quantity*single.price
        return{
            product_id:single.id,
            title:single.title,
            description:single.description,
            price:single.price,
            image:single.image,
            quantity:item.quantity
        }
        }));
        res.status(200).json({result:array,subTotal:subTotal})
    } catch (error) {
        console.log(error)
    }
}

exports.deleteCart=async (req,res)=>{
    try {
        const {user_id}=req.user
        const product_id=req.params.id
        var cart=await Cart.findOne({user_id})
        if(cart.products.length==0){
            return res.status(400).json("no items in cart")
        }
        cart.products=cart.products.filter((item)=>(
            item.product_id!=product_id
        ))
        await Cart.findOneAndUpdate({user_id},{products:cart.products})
        return res.status(200).json(cart)
    } catch (error) {
        console.log(error)
    }
}
const User = require("../models/userModel")
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken')

exports.createUser= async (req,res)=>{
    try {
        const {name,email,password}=req.body
        // const user=await User.findOne({email})
        // if(user){
        //     return res.status(400).json("User Already Exist")
        // }
        const data=new User({
            name,
            email,
            password
        })
        await data.save()
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
}

exports.login=async (req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json("Invalid Email or Password")
        }
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json("Invalid Password")
        }
        const token = jwt.sign({user_id:user._id},'0.0',{
            expiresIn:"1h"
        })
        res.status(200).json(token)
    } catch (error) {
        console.log(error);
    }
}
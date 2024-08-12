const express=require('express')
const cors=require('cors')
const productRoutes=require('./routes/productRoutes')
const userRoutes=require('./routes/userRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes= require('./routes/orderRoutes')
const mongoose=require('mongoose')

const app=express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://localhost:27017/ecom")
.then(()=>{
    console.log("connected to mongodb");
})
.catch(()=>{
    console.log("error in connecting");
    
})

app.use('/products',productRoutes)
app.use('/user',userRoutes)
app.use('/cart',cartRoutes)
app.use('/order',orderRoutes)

app.listen(3000,()=>{
    console.log("port running in 3000")
})
const jwt =require('jsonwebtoken')

const auth=(req,res,next)=>{
    
    const token=req.header('Authorization').split(" ")[1];
    if(!token){
        return res.status(401).json({error:"no token , authorisation deneid"})
    }
    try{
        const decoded=jwt.verify(token,'0.0')
        req.user=decoded
        next()
    }catch(error){
        res.status(401).json(error)
    }
}

module.exports=auth


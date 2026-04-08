
import jwt from 'jsonwebtoken';
import Projects from "../Schema/ProjectSchema.js";


export const Protected=async(req,res,next)=>{
    try{
        const { token } = req.cookies;

        if(!token){
            res.status(403).json({message:'Invalid Token'})
            return
        }
        const verify=jwt.verify(token,process.env.SECRET)
        if(!verify){
            res.status(403).json({sucess:true,message:'Invalid Token'})
            return
        }
        next()
    }catch(error){
        res.status(500).json({sucess:false,message:'Invalid Token'})
    }
}
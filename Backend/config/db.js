import mongoose from 'mongoose';
import dotenv from 'dotenv';



dotenv.config();


export const Connection=async()=>{
    try{
        console.log(process.env.DATABASE)
        const conn=await mongoose.connect(process.env.DATABASE)
        console.log('Database connected')
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}
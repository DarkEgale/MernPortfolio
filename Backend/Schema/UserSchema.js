import mongoose, { Schema } from 'mongoose';


const userSchema=new Schema({
    email:{
        type:String,
    },
    password:{
        type:String,
    }
})
const Admin=mongoose.model('Admin',userSchema)
export default Admin;
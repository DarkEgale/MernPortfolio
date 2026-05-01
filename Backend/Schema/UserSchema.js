import mongoose, { Schema } from 'mongoose';


const userSchema=new Schema({
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password:{
        type:String,
        required: true,
        minlength: 6,
    }
})
const Admin=mongoose.model('Admin',userSchema)
export default Admin;

import mongoose from 'mongoose';

const urlValidator = {
    validator: (value) => /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(value),
    message: 'URL must start with http:// or https://',
};

const projectSchema=new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 120,
    },
    description:{
        type:String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 5000,
    },
    techStack:[
        {
            type:String,
            trim: true,
            maxlength: 40,
        }
    ],
    thumbnail:{
        type:String,
        required: true,
        trim: true,
    },
    screenShots:
    [
        {
            type:String,
            trim: true,
        }
    ],
    live:{
        type:String,
        required: true,
        trim: true,
        validate: urlValidator,
    },
    gitrepo:{
        type:String,
        required: true,
        trim: true,
        validate: urlValidator,
    }
    
},{timestamps:true})

const Projects=mongoose.model('Projects',projectSchema)
export default Projects

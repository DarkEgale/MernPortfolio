import mongoose from 'mongoose';

const projectSchema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    techStack:[
        {type:String}
    ],
    thumbnail:{
        type:String,
    },
    screenShots:
    [
        {type:String}
    ]
    
},{timestamps:true})

const Projects=mongoose.model('Projects',projectSchema)
export default Projects
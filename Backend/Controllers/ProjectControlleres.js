

import Projects from "../Schema/ProjectSchema.js";


export const ProjectsControllers=async(req,res)=>{
    try{
        const projects=await Projects.find({});
        res.status(200).json({sucess:true,message:'Projects Found',count:projects.length,projects:projects})
    }catch(error){
        console.error(error)
        res.status(500).json({message:'Internal Server Error'})
    }
}

export const singleProject=async(req,res)=>{
    try{
        const {id}=req.params
        console.log(id)
        const project=await Projects.findById(id)
        if(project){
            res.status(200).json({sucess:true,project})
        }
    }catch(error){
        console.error(error);
        res.status(500).json({sucess:false,message:'Internal Server Error'})
        
    }
}
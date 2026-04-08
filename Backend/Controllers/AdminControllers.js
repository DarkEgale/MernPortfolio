import Admin from "../Schema/UserSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Projects from "../Schema/ProjectSchema.js";
import { uploadToCloudinary } from "../Middleware/uploadCloudinary.js";
import sharp from 'sharp';

// --- Login Controller ---
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        
        if (!admin) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id }, process.env.SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        }).status(200).json({
            success: true,
            message: 'Login Successful',
            admin: { id: admin._id, email: admin.email }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// --- Register Controller ---
export const Register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usercheck = await Admin.findOne({ email });
        if (usercheck) {
            return res.status(400).json({ success: false, message: 'User Already Exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await Admin.create({ email, password: hashPassword });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        }).status(201).json({
            success: true,
            message: 'Registration Successful',
            admin: { email: user.email, id: user._id }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// --- Create Project Controller ---
export const createProjects = async (req, res) => {
    try {
        const data = req.body;
        
        console.log(req.files)
        let thumbnailUrl = '';
        if (req.files?.thumbnail) {
            const buffer = await sharp(req.files.thumbnail[0].buffer)
                .resize(800, 600, { fit: 'cover' })
                .webp({ quality: 80 })
                .toBuffer();
            thumbnailUrl = await uploadToCloudinary(buffer, 'project/thumbnail');
        }


        let screenShotsUrls = [];
        if (req.files?.screenShots) {
            const uploadPromises = req.files.screenShots.map(async (file) => {
                const buffer = await sharp(file.buffer) 
                    .resize(1280, 720, { fit: 'inside' })
                    .webp({ quality: 80 })
                    .toBuffer();
                return uploadToCloudinary(buffer, 'project/screenShots');
            });
            screenShotsUrls = await Promise.all(uploadPromises);
        }

      
        const project = await Projects.create({
            ...data,
            thumbnail: thumbnailUrl, 
            screenShots: screenShotsUrls
        });

        res.status(201).json({ success: true, message: 'Project Created', project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// --- Delete Project Controller ---
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params; 
        const project = await Projects.findById(id);
        
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        await Projects.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Project was deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } 
};

export const updateProjects = async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = { ...req.body };
        console.log(updateData)
        const parsedTech = JSON.parse(req.body.techStack);
                
        updateData.techStack = Array.isArray(parsedTech) ? parsedTech : [parsedTech];

        const project = await Projects.findById(id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }


        if (req.files?.thumbnail) {
            const buffer = await sharp(req.files.thumbnail[0].buffer)
                .resize(800, 600, { fit: 'cover' })
                .webp({ quality: 80 })
                .toBuffer();
            const thumbnailUrl = await uploadToCloudinary(buffer, 'project/thumbnail');
            updateData.thumbnail = thumbnailUrl; 
        }


        if (req.files?.screenShots) {
            const uploadPromises = req.files.screenShots.map(async (file) => {
                const buffer = await sharp(file.buffer)
                    .resize(1280, 720, { fit: 'inside' })
                    .webp({ quality: 80 })
                    .toBuffer();
                return uploadToCloudinary(buffer, 'project/screenShots');
            });
            const screenShotsUrls = await Promise.all(uploadPromises);
            updateData.screenShots = screenShotsUrls; 
        }

       
        const updatedProject = await Projects.findByIdAndUpdate(
            id, 
            { $set: updateData }, 
            { new: true }
        );

        res.status(200).json({ 
            success: true, 
            message: 'Project Updated Successfully', 
            project: updatedProject 
        });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
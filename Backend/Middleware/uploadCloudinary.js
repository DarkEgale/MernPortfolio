import sharp from 'sharp';
import cloudinary from '../config/cloudinaryConfig.js';

export const uploadToCloudinary = (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { 
                folder: folder,
                resource_type: 'auto',
                format: 'webp' 
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        ).end(fileBuffer);
    });
};
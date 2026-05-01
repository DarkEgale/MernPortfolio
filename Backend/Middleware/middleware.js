
/* global process */
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import AccessToken from "../Schema/AcessToken.js";

export const Protected=async(req,res,next)=>{
    try{
        const { token } = req.cookies;

        if(!token){
            res.status(403).json({message:'Invalid Token'})
            return
        }
        const tokenRecord = await AccessToken.findOne({ token });
        if (!tokenRecord) {
            res.status(403).json({ success: false, message: 'Invalid Token' });
            return;
        }
        if (tokenRecord.expiresAt < new Date()) {
            await AccessToken.deleteOne({ token });
            res.status(403).json({ success: false, message: 'Token Expired' });
            return;
        }
        const verify=jwt.verify(token,process.env.SECRET)
        if(!verify){
            res.status(403).json({sucess:true,message:'Invalid Token'})
            return
        }
        next()
    }catch{
        res.status(403).json({sucess:false,message:'Invalid Token'})
    }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

const trimValue = (value) => typeof value === 'string' ? value.trim() : value;

const sendValidationError = (res, errors) => {
    return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
    });
};

const validateText = ({ value, field, errors, required = false, min = 1, max = 5000 }) => {
    const trimmed = trimValue(value);

    if (!trimmed) {
        if (required) errors[field] = `${field} is required`;
        return undefined;
    }

    if (typeof trimmed !== 'string') {
        errors[field] = `${field} must be text`;
        return undefined;
    }

    if (trimmed.length < min) {
        errors[field] = `${field} must be at least ${min} characters`;
        return undefined;
    }

    if (trimmed.length > max) {
        errors[field] = `${field} must be ${max} characters or less`;
        return undefined;
    }

    return trimmed;
};

const parseTechStack = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value !== 'string') return [];

    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
        return value.split(',');
    }
};

const sanitizeTechStack = (value, errors, required = false) => {
    const techStack = parseTechStack(value)
        .map((item) => trimValue(item))
        .filter(Boolean);

    if (required && techStack.length === 0) {
        errors.techStack = 'techStack is required';
        return [];
    }

    if (techStack.length > 20) {
        errors.techStack = 'techStack can contain up to 20 items';
        return [];
    }

    const invalidItem = techStack.find((item) => typeof item !== 'string' || item.length > 40);
    if (invalidItem) {
        errors.techStack = 'Each techStack item must be text up to 40 characters';
        return [];
    }

    return [...new Set(techStack)];
};

const sanitizeUrl = ({ value, field, errors, required = false }) => {
    const url = validateText({ value, field, errors, required, min: 8, max: 500 });
    if (!url) return undefined;

    if (!URL_REGEX.test(url)) {
        errors[field] = `${field} must be a valid http or https URL`;
        return undefined;
    }

    return url;
};

const hasFile = (req, field) => Boolean(req.files?.[field]?.length || req.file?.fieldname === field);

export const validateObjectId = (param = 'id') => (req, res, next) => {
    const id = req.params[param];
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return sendValidationError(res, { [param]: 'Invalid id' });
    }
    next();
};

export const validateAuth = (req, res, next) => {
    const errors = {};
    const body = req.body || {};
    const email = validateText({ value: body.email, field: 'email', errors, required: true, max: 254 });
    const password = validateText({ value: body.password, field: 'password', errors, required: true, min: 6, max: 128 });

    if (email && !EMAIL_REGEX.test(email)) {
        errors.email = 'email must be valid';
    }

    if (Object.keys(errors).length > 0) {
        return sendValidationError(res, errors);
    }

    req.body.email = email.toLowerCase();
    req.body.password = password;
    next();
};

export const validateProjectCreate = (req, res, next) => {
    const errors = {};
    const body = req.body || {};
    const title = validateText({ value: body.title, field: 'title', errors, required: true, min: 2, max: 120 });
    const description = validateText({ value: body.description, field: 'description', errors, required: true, min: 10, max: 5000 });
    const live = sanitizeUrl({ value: body.live, field: 'live', errors, required: true });
    const gitrepo = sanitizeUrl({ value: body.gitrepo, field: 'gitrepo', errors, required: true });
    const techStack = sanitizeTechStack(body.techStack, errors, true);

    if (!hasFile(req, 'thumbnail')) {
        errors.thumbnail = 'thumbnail image is required';
    }

    if (Object.keys(errors).length > 0) {
        return sendValidationError(res, errors);
    }

    req.body = { title, description, live, gitrepo, techStack };
    next();
};

export const validateProjectUpdate = (req, res, next) => {
    const errors = {};
    const body = req.body || {};
    const updateData = {};

    if (body.title !== undefined) {
        updateData.title = validateText({ value: body.title, field: 'title', errors, required: true, min: 2, max: 120 });
    }

    if (body.description !== undefined) {
        updateData.description = validateText({ value: body.description, field: 'description', errors, required: true, min: 10, max: 5000 });
    }

    if (body.live !== undefined) {
        updateData.live = sanitizeUrl({ value: body.live, field: 'live', errors, required: true });
    }

    if (body.gitrepo !== undefined) {
        updateData.gitrepo = sanitizeUrl({ value: body.gitrepo, field: 'gitrepo', errors, required: true });
    }

    if (body.techStack !== undefined) {
        updateData.techStack = sanitizeTechStack(body.techStack, errors, true);
    }

    Object.keys(updateData).forEach((key) => {
        if (updateData[key] === undefined) delete updateData[key];
    });

    const hasUpload = hasFile(req, 'thumbnail') || hasFile(req, 'screenShots');
    if (Object.keys(updateData).length === 0 && !hasUpload) {
        errors.body = 'At least one field or image is required';
    }

    if (Object.keys(errors).length > 0) {
        return sendValidationError(res, errors);
    }

    req.body = updateData;
    next();
};

export const validateBlogCreate = (req, res, next) => {
    const errors = {};
    const body = req.body || {};
    const title = validateText({ value: body.title, field: 'title', errors, required: true, min: 2, max: 160 });
    const subtitle = validateText({ value: body.subtitle, field: 'subtitle', errors, required: true, min: 2, max: 240 });
    const content = validateText({ value: body.content, field: 'content', errors, required: true, min: 10, max: 20000 });

    if (!req.file) {
        errors.image = 'image is required';
    }

    if (Object.keys(errors).length > 0) {
        return sendValidationError(res, errors);
    }

    req.body = { title, subtitle, content };
    next();
};

export const validateBlogUpdate = (req, res, next) => {
    const errors = {};
    const body = req.body || {};
    const updateData = {};

    if (body.title !== undefined) {
        updateData.title = validateText({ value: body.title, field: 'title', errors, required: true, min: 2, max: 160 });
    }

    if (body.subtitle !== undefined) {
        updateData.subtitle = validateText({ value: body.subtitle, field: 'subtitle', errors, required: true, min: 2, max: 240 });
    }

    if (body.content !== undefined) {
        updateData.content = validateText({ value: body.content, field: 'content', errors, required: true, min: 10, max: 20000 });
    }

    Object.keys(updateData).forEach((key) => {
        if (updateData[key] === undefined) delete updateData[key];
    });

    if (Object.keys(updateData).length === 0 && !req.file) {
        errors.body = 'At least one field or image is required';
    }

    if (Object.keys(errors).length > 0) {
        return sendValidationError(res, errors);
    }

    req.body = updateData;
    next();
};

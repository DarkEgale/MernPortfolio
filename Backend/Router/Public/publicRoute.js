import { ProjectsControllers,singleProject } from "../../Controllers/ProjectControlleres.js";
import { getBlogs, getBlogById } from "../../Controllers/BlogControllers.js";
import Router from 'express';
import mongoose from 'mongoose';

const router=Router()

const validatePublicObjectId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid id',
        });
    }

    next();
};

router.get('/projects',ProjectsControllers)
router.get('/projects/:id',validatePublicObjectId,singleProject)
router.get('/blogs', getBlogs)
router.get('/blogs/:id', validatePublicObjectId, getBlogById)


export default router;

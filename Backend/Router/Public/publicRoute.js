import { ProjectsControllers,singleProject } from "../../Controllers/ProjectControlleres.js";
import { getBlogs, getBlogById } from "../../Controllers/BlogControllers.js";
import { validateObjectId } from "../../Middleware/middleware.js";
import Router from 'express';

const router=Router()

router.get('/projects',ProjectsControllers)
router.get('/projects/:id',validateObjectId(),singleProject)
router.get('/blogs', getBlogs)
router.get('/blogs/:id', validateObjectId(), getBlogById)


export default router;

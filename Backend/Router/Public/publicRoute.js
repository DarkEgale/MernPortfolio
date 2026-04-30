import { ProjectsControllers,singleProject } from "../../Controllers/ProjectControlleres.js";
import { getBlogs, getBlogById } from "../../Controllers/BlogControllers.js";
import Router from 'express';

const router=Router()

router.get('/projects',ProjectsControllers)
router.get('/projects/:id',singleProject)
router.get('/blogs', getBlogs)
router.get('/blogs/:id', getBlogById)


export default router;
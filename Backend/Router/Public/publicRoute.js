import { ProjectsControllers,singleProject } from "../../Controllers/ProjectControlleres.js";
import Router from 'express';

const router=Router()

router.get('/projects',ProjectsControllers)
router.get('/projects/:id',singleProject)


export default router;
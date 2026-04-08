import express from 'express';
import { 
    Login, 
    Register, 
    createProjects, 
    deleteProject, 
    updateProjects 
} from "../../Controllers/AdminControllers.js";
import { Protected } from "../../Middleware/middleware.js";
import { upload } from "../../Middleware/multer.js";

const router = express.Router();


router.post('/register', Register);
router.post('/login', Login);


router.post(
    '/create', 
    Protected, 
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'screenShots', maxCount: 10 }
    ]), 
    createProjects
);


router.patch(
    '/update/:id', 
    Protected, 
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'screenShots', maxCount: 10 }
    ]), 
    updateProjects
);


router.delete('/delete/:id', Protected, deleteProject);

export default router;
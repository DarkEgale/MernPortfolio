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
import { createBlog, updateBlog, deleteBlog } from "../../Controllers/BlogControllers.js";

const router = express.Router();

// debug: log admin router requests
router.use((req, res, next) => {
    console.log(`[ADMIN ROUTER] ${req.method} ${req.originalUrl}`)
    next()
})


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

// Blog admin routes
// respond to preflight explicitly for create/update
router.options('/blog/create', (req, res) => res.sendStatus(200))
router.options('/blog/update/:id', (req, res) => res.sendStatus(200))
router.post('/blog/create', Protected, upload.single('image'), createBlog);
router.patch('/blog/update/:id', Protected, upload.single('image'), updateBlog);
router.delete('/blog/delete/:id', Protected, deleteBlog);

export default router;
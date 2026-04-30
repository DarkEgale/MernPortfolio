import Blog from "../Schema/BlogSchema";
import { uploadToCloudinary } from "../Middleware/uploadCloudinary.js";

export const createBlog = async (req, res) => {
    try {
        const { title, content, subtitle } = req.body;
        // multer uses memoryStorage; use buffer when available
        const image = req.file ? await uploadToCloudinary(req.file.buffer) : null;

        if (!title || !content || !subtitle || !image) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newBlog = await Blog.create({ title, content, subtitle, image });
        res.status(201).json({ success: true, message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json({ success: true, blog });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, subtitle } = req.body;
        const image = req.file ? await uploadToCloudinary(req.file.buffer) : null;

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.subtitle = subtitle || blog.subtitle;
        if (image) {
            blog.image = image;
        }

        await blog.save();
        res.status(200).json({ success: true, message: 'Blog updated successfully', blog });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
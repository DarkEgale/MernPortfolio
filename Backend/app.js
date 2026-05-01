import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import publicRoute from './Router/Public/publicRoute.js';
import adminRouter from './Router/Admin/adminRouter.js';
import rateLimit from 'express-rate-limit';
import multer from 'multer';


dotenv.config();


const app=express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
const allowedOrigins = [
    'https://www.mdshimulhossen.top',
    'https://mdshimulhossen.top',
];

const isAllowedOrigin = (origin) => {
    if (!origin) return true;
    if (allowedOrigins.includes(origin)) return true;
    return /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
};

app.use(cors({
    origin: (origin, callback) => {
        if (isAllowedOrigin(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error('Not allowed by CORS'));
    },
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100, 
	message: {
        success: false,
        message: "Too many requests from this IP, please try again after 15 minutes."
    },
	standardHeaders: true, 
	legacyHeaders: false, 
})


app.use('/api/',apiLimiter)
app.use('/api/public',publicRoute)
app.use('/api/admin',adminRouter)

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            message: 'File upload validation failed',
            errors: { file: err.message },
        });
    }

    if (err?.message === 'Only image files are allowed') {
        return res.status(400).json({
            success: false,
            message: 'File upload validation failed',
            errors: { file: err.message },
        });
    }

    next(err);
});

// expose a lightweight routes listing for debugging deployments
function listRegisteredRoutes() {
    const routes = []
    const stack = app._router && app._router.stack ? app._router.stack : []
    stack.forEach((layer) => {
        if (layer.route && layer.route.path) {
            const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase())
            routes.push({ path: layer.route.path, methods })
        } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
            layer.handle.stack.forEach((handler) => {
                if (handler.route && handler.route.path) {
                    const methods = Object.keys(handler.route.methods).map(m => m.toUpperCase())
                    routes.push({ path: handler.route.path, methods })
                }
            })
        }
    })
    return routes
}

app.get('/routes', (req, res) => {
    try {
        const routes = listRegisteredRoutes()
        res.json({ success: true, routes })
    } catch {
        res.status(500).json({ success: false, message: 'Failed to enumerate routes' })
    }
})

// log routes on startup for deploy troubleshooting
const _routes = listRegisteredRoutes()
console.log('[ROUTES]', JSON.stringify(_routes, null, 2))





export default app;

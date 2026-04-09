import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import publicRoute from './Router/Public/publicRoute.js';
import adminRouter from './Router/Admin/adminRouter.js';
import rateLimit from 'express-rate-limit';


dotenv.config();


const app=express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({
    origin: ['https://www.mdshimulhossen.top', 'https://mdshimulhossen.top'], 
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





export default app;



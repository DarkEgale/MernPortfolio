import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import publicRoute from './Router/Public/publicRoute.js';
import adminRouter from './Router/Admin/adminRouter.js';


dotenv.config();


const app=express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({

    origin: 'http://localhost:5173', 

    credentials: true, 

    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],

    allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use('/api/public',publicRoute)
app.use('/api/admin',adminRouter)





export default app;



import app from "./app.js";
import dotenv from 'dotenv';
import { Connection } from "./config/db.js";

dotenv.config();
Connection();

app.listen('5000',()=>{
    console.log('server is running on port 5000')
})




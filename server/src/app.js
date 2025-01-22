import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import {inventoryRoutes} from './routes/inventory.routes.js'
import { salesRoutes } from "./routes/sale.routes.js";
import { customerRoutes } from "./routes/customer.routes.js";
import {dashboardRoutes} from "./routes/dashboard.routes.js";

const app = express()

// Allowed origin for frontend
const corsOptions = {
    origin: "http://localhost:5173",  
    credentials: true,  
};

app.use(cors(corsOptions)); 

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.use("/api/v1/users",userRouter) 
app.use("/api/v1/auth", authRoutes);


app.use('/api/v1/inventory', inventoryRoutes);
app.use('/api/v1/sales', salesRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/', dashboardRoutes);

export { app }
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./db/index.js";

const app = express()

// Allowed origin for frontend
const corsOptions = {
    origin: "http://localhost:5173", // Replace with your frontend URL if it changes
    credentials: true,              // Allow cookies and credentials
};

app.use(cors(corsOptions)); // Apply CORS to all routes

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter) 
app.use("/api/v1/auth", authRoutes);

import {inventoryRoutes} from './routes/inventory.routes.js'
import { salesRoutes } from "./routes/sale.routes.js";
import { customerRoutes } from "./routes/customer.routes.js";
import {dashboardRoutes} from "./routes/dashboard.routes.js";

app.use('/api/v1/inventory', inventoryRoutes);
app.use('/api/v1/sales', salesRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/', dashboardRoutes);

//when user types \users than controll is given to userRouter which goes to user.routes.js file where it takes further to /register page and after this url gets generated like this https://localhost:8000/api/v1/users/register

export { app }
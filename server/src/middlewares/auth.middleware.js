import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import dotenv from "dotenv"
dotenv.config();

export const verifyJWT = asyncHandler(async(req,res,next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")

        if(!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.JWTPRIVATEKEY)

        const user = await User.findById(decodedToken?.id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.log("Token has expired");
            throw new ApiError(401, "Token has expired");
        }

        throw new ApiError(401,error?.message || "Invalid access Token")
    }
})
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("No file path provided to Cloudinary upload.");
            return null;
        }

        const resolvedPath = path.resolve(localFilePath).replace(/\\/g, "/");

        console.log("Uploading to Cloudinary:", resolvedPath);

        // Upload with a timeout
        const response = await cloudinary.uploader.upload(resolvedPath, {
            resource_type: "image",
            timeout: 120000,
        });

        console.log("Cloudinary upload successful:", response);

        // Remove local file
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.error("Cloudinary upload failed:", error.error || error.message || error);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); 
        }
        return null;
    }
};
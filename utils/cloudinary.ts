import {v2 as cloudinary} from "cloudinary"
import env from "dotenv"
env.config()
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET,
    });
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try{
        const connectionInstanace = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nMongoDB connected !! DB Host:${connectionInstanace.connection.host}`)
    }catch(error){
        console.log("MONGODB connection error ", error);
        process.exit(1)
    }
}

export default connectDB;
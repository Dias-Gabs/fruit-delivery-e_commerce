import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('API-KEY').then(()=>console.log("- #LOG: MongoDB Database connected!"));
}

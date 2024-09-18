import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://fruitfresh:198198Gg$@cluster0.82xg4.mongodb.net/fruitfresh-ecommerce').then(()=>console.log("- #LOG: MongoDB Database connected!"));
}
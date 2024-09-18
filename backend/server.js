import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"

// - App Config
const app = express()
const port = 4000

// - Middleware
app.use(express.json())
app.use(cors())

// Db Connetion:
connectDB();

// Api Endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))

app.get("/",(req,res)=>{
    res.send("- #LOG: API Working")
})

app.listen(port,()=>{
    console.log(`- #LOG: Server started on http://localhost:${port}`) 
})

// mongodb+srv://fruitfresh:198198Gg$@cluster0.82xg4.mongodb.net/?
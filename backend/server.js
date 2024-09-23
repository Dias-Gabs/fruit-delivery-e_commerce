// import express from "express"
// import cors from "cors"
// import { connectDB } from "./config/db.js"
// import foodRouter from "./routes/foodRoute.js"
// import userRoute from "./routes/userRoute.js"
// import 'dotenv/config.js'
// import cartRouter from "./routes/cartRoute.js"
// import orderRouter from "./routes/orderRoute.js"

// // - App Config
// const app = express()
// const port = 4000

// // - Middleware
// app.use(express.json())
// app.use(cors())

// // Db Connetion:
// connectDB();

// // Api Endpoints
// app.use("/api/food",foodRouter)
// app.use("/images",express.static('uploads'))
// app.use("/api/user",userRoute)
// app.use("/api/cart",cartRouter)
// app.use("/api/order",orderRouter)

// app.get("/",(req,res)=>{
//     res.send("- #LOG: API Working")
// })

// app.listen(port,()=>{
//     console.log(`- #LOG: Server started on http://localhost:${port}`) 
// })

// // mongodb+srv://fruitfresh:198198Gg$@cluster0.82xg4.mongodb.net/?

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRoute from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import nextcloudRouter from './routes/nextcloudRoute.js';
import { loginUser, registerUser } from './controllers/userController.js';
import { placeOrder, verifyOrder } from './controllers/orderController.js';
import { getAllFoods } from './controllers/foodController.js';
import 'dotenv/config.js';

// - App Config
const app = express();
const port = process.env.PORT || 4000;

// - Middleware
app.use(express.json());
app.use(cors());

// Db Connection:
connectDB();

// Api Endpoints
app.post('/api/auth/login', loginUser);
app.post('/api/auth/register', registerUser);
app.post('/api/orders', placeOrder);
app.post('/api/orders/verify', verifyOrder);
app.get('/api/foods', getAllFoods);
app.use('/api/food', foodRouter);
app.use('/api/user', userRoute);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/nextcloud', nextcloudRouter);
app.use('/images', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('- #LOG: API Working');
});

app.listen(port, () => {
    console.log(`- #LOG: Server started on http://localhost:${port}`);
});

// import express from "express";
// import authMiddleware from "../middleware/auth.js";
// import { placeOrder, userOrders, verifyOrder, listOrders, updateStatus } from "../controllers/orderController.js";

// const orderRouter = express.Router();

// orderRouter.post("/place",authMiddleware,placeOrder);
// orderRouter.post("/verify",verifyOrder);
// orderRouter.post("/userorders",authMiddleware,userOrders);
// orderRouter.get('/list',listOrders);
// orderRouter.post('/status',updateStatus)

// export default orderRouter;

// routes/orderRoute.js
import express from "express";
import { createOrder, getOrderById } from "../controllers/orderController.js"; // Controller para pedidos
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Rota para criar um pedido
router.post("/", authMiddleware, createOrder);

// Rota para obter um pedido específico
router.get("/:orderId", authMiddleware, getOrderById);

export default router;

// import express from "express";
// import { addToCart,removeFromCart,getCart } from "../controllers/cartController.js";
// import authMiddleware from "../middleware/auth.js";


// const cartRouter = express.Router();

// cartRouter.post("/add",authMiddleware,addToCart)
// cartRouter.post("/remvove",authMiddleware,removeFromCart)
// cartRouter.post("/get",authMiddleware,getCart)

// export default cartRouter;

// routes/cartRoute.js
import express from "express";
import { addToCart, updateCartItem, removeFromCart, listCartItems } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js"; // Middleware de autenticação

const router = express.Router();

// Rota para adicionar um item ao carrinho
router.post("/add", authMiddleware, addToCart);

// Rota para atualizar um item no carrinho
router.put("/update", authMiddleware, updateCartItem);

// Rota para remover um item do carrinho
router.delete("/remove", authMiddleware, removeFromCart);

// Rota para listar itens do carrinho
router.get("/:userId", authMiddleware, listCartItems);

export default router;

import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js"; // Importe a função corretamente
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Rota para registrar um novo usuário
router.post("/register", registerUser);

// Rota para login de usuário
router.post("/login", loginUser);

// Rota para obter o perfil do usuário
router.get("/profile", authMiddleware, getUserProfile);

export default router;

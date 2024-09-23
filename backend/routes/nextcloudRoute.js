import express from "express";
import { saveImage, getUserImages } from "../controllers/nextcloudController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Rota para salvar imagem
router.post("/images", authMiddleware, async (req, res) => {
    const { imageData } = req.body;
    const userId = req.body.userId; // Obtido do middleware
    const result = await saveImage(userId, imageData);
    res.json(result);
});

// Rota para consultar imagens do usuário
router.get("/images", authMiddleware, async (req, res) => {
    const userId = req.body.userId; // Obtido do middleware
    const images = await getUserImages(userId);
    res.json(images);
});

export default router;

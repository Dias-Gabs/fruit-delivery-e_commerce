import jwt from "jsonwebtoken";
import { getUserById } from "../controllers/userController.js"; // Importa corretamente

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Login não autorizado!" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getUserById(token_decode.id); // Buscar usuário pelo ID

        if (!user) {
            return res.json({ success: false, message: "Usuário não encontrado!" });
        }

        req.body.userId = user.id; // Adiciona o ID do usuário à requisição
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Erro ao autenticar o token!" });
    }
};

export default authMiddleware;

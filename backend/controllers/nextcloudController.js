import { db } from "../config/db.js"; // Certifique-se de importar a conexão com o banco de dados
import sequelize from "../config/db.js"; // Importe a instância do Sequelize

// Aqui você pode usar sequelize para interagir com o banco de dados


// Função para salvar uma imagem no banco de dados
export const saveImage = async (userId, imageData) => {
    try {
        const query = "INSERT INTO images (user_id, image_data) VALUES (?, ?)";
        await db.execute(query, [userId, imageData]);
        return { success: true, message: "Imagem salva com sucesso!" };
    } catch (error) {
        console.error("Erro ao salvar imagem:", error);
        return { success: false, message: "Erro ao salvar a imagem." };
    }
};

// Função para consultar imagens de um usuário
export const getUserImages = async (userId) => {
    try {
        const query = "SELECT * FROM images WHERE user_id = ?";
        const [rows] = await db.execute(query, [userId]);
        return rows;
    } catch (error) {
        console.error("Erro ao consultar imagens:", error);
        return [];
    }
};

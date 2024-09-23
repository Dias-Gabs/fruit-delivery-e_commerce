// import mongoose from "mongoose";

// export const connectDB = async () => {
//     await mongoose.connect('mongodb+srv://fruitfresh:198198Gg$@cluster0.82xg4.mongodb.net/fruitfresh-ecommerce').then(()=>console.log("- #LOG: MongoDB Database connected!"));
// }

import { Sequelize } from 'sequelize';

// Configuração do banco de dados
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'ip_do_banco_de_dados',
    dialect: 'mariadb',
    logging: false,
    retry: {
        max: 3
    }
});

// Função para conectar ao banco de dados
export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("- #LOG: MariaDB Database connected!");
    } catch (error) {
        console.error("- #LOG: Unable to connect to the database:", error);
        // Se não conseguir conectar, pode criar localmente ou tentar novamente
        for (let i = 0; i < 3; i++) {
            try {
                await sequelize.authenticate();
                console.log("- #LOG: MariaDB Database connected!");
                return;
            } catch (error) {
                console.error("- #LOG: Attempt", i + 1, "failed");
            }
        }
        // Criar banco de dados local se não conseguir conectar
        console.log("- #LOG: Creating local database...");
        // Lógica para criar o banco local
    }
};

export default sequelize;

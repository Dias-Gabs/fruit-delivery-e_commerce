import { Sequelize } from 'sequelize';
import { setupDatabase, createDatabaseAndTables } from './dbSetup.js';

// Configuração do banco de dados
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'ip_do_banco_de_dados',
    port: 3306, // Certifique-se de que a porta está correta
    dialect: 'mariadb',
    logging: false,
    retry: {
        max: 3
    }
});

// Função para tentar conectar ao banco de dados
export const connectDB = async () => {
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            await sequelize.authenticate();
            console.log("- #LOG: MariaDB Database connected!");
            // Chama a função de configuração para verificar e configurar as tabelas
            await setupDatabase(sequelize);
            return;
        } catch (error) {
            console.error("- #LOG: Unable to connect to the database:", error);
            if (attempt === 3) {
                console.log("- #LOG: Attempting to create local database...");
                await createDatabaseAndTables(sequelize);
            }
        }
    }
};

// Exportação do objeto sequelize
export default sequelize; // Exportação padrão
export { sequelize as db }; // Exportando como 'db'

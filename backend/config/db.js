import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import { setupDatabase, createDatabaseAndTables } from './dbSetup.js';

// Carrega as variáveis de ambiente do .env
config(); 

// Configuração do banco de dados usando variáveis do .env
const sequelize = new Sequelize(
    process.env.MYSQL_ECOMMERCE_DB,
    process.env.MYSQL_ECOMMERCE_USER,
    process.env.MYSQL_ECOMMERCE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: 'mariadb',
        logging: false,
        retry: {
            max: 3
        }
    }
);

// Função para listar tabelas e colunas
const logDatabaseStructure = async () => {
    const queryInterface = sequelize.getQueryInterface();
    
    // Listar tabelas do banco de dados
    const tables = await queryInterface.showAllTables();
    
    console.log(`- #LOG: Tables and columns in database '${process.env.MYSQL_ECOMMERCE_DB}':`);
    for (const table of tables) {
        console.log(`  - Table: ${table}`);
        try {
            // Usar 'describeTable' para obter a estrutura da tabela
            const columns = await queryInterface.describeTable(table);
            for (const [columnName, columnDetails] of Object.entries(columns)) {
                console.log(`    - Column: ${columnName} (Type: ${columnDetails.type})`);
            }
        } catch (err) {
            console.error(`    - #LOG: Error describing table ${table}:`, err.message);
        }
    }
};

// Função para tentar conectar ao banco de dados
export const connectDB = async () => {
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            await sequelize.authenticate();
            console.log(`- #LOG: MariaDB Database connected to ${process.env.MYSQL_ECOMMERCE_DB} at ${process.env.DATABASE_HOST} with user ${process.env.MYSQL_ECOMMERCE_USER}!`);
            
            const result = await setupDatabase(sequelize);
            if (result) {
                console.log("- #LOG: Database setup completed. No changes required.");
            } else {
                console.log("- #LOG: Database was altered or created. Check details.");
            }
            
            await logDatabaseStructure();
            return;
        } catch (error) {
            console.error("- #LOG: Unable to connect to the database:", error);
            if (attempt === 3) {
                console.log("- #LOG: Attempting to create local database...");
                const result = await createDatabaseAndTables(sequelize);
                console.log(result ? "- #LOG: Local database created successfully." : "- #LOG: Local database already exists or was not created.");
            }
        }
    }
};

// Exportação do objeto sequelize
export default sequelize; 
export { sequelize as db };

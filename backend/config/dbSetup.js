import fs from 'fs';
import path from 'path';

export const setupDatabase = async (connection) => {
    const sqlFilePath = path.join(__dirname, 'setup.sql');
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');

    await connection.query(sqlScript);
    console.log("- #LOG: Database setup completed.");
};

// Função para criar o SQL caso não exista
export const createDatabaseAndTables = async (connection) => {
    const createDatabase = `CREATE DATABASE IF NOT EXISTS ${connection.config.database};`;
    await connection.query(createDatabase);
    
    // Aqui você pode adicionar a lógica para criar tabelas
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            cartData JSON DEFAULT '{}'
        );
    `;
    
    const createOrdersTable = `
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            items JSON NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            address JSON NOT NULL,
            status VARCHAR(255) DEFAULT 'Processing',
            payment BOOLEAN NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    await connection.query(createUsersTable);
    await connection.query(createOrdersTable);
};

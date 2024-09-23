import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mariadb',  // ou 'mysql', 'postgres', 'sqlite', etc.
});

export default sequelize;

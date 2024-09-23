import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Definindo o modelo do usuário
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cartData: {
        type: DataTypes.JSON,
        defaultValue: {}
    }
}, {
    tableName: 'users', // Nome da tabela no banco de dados
    timestamps: false // Não usar timestamps automáticos
});

// Exportando o modelo User
export default User;

// models/cartModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cartData: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});

export default Cart;

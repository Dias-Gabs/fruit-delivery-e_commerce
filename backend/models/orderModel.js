// import mongoose, { mongo } from "mongoose";

// const orderSchema = new mongoose.Schema({
//     userId:{type:String,required:true},
//     itens:{type:Array,required:true},
//     amount:{type:Number,required:true},
//     address:{type:Object,required:true},
//     status:{type:String,default:"Processando produtos"},
//     date:{type:Date,default:Date.now()},
//     payment:{type:Boolean,required:true},
// })

// const orderModel = mongoose.models.order || mongoose.model("order",orderSchema)
// export default orderModel;

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Definindo o modelo do pedido
const orderModel = sequelize.define('Order', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    address: {
        type: DataTypes.JSON,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "Processando produtos"
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    payment: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'orders', // Nome da tabela no banco de dados
    timestamps: false // Não usar timestamps automáticos
});

export default orderModel;

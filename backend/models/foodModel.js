// import mongoose from "mongoose";

// const foodSchema = new mongoose.Schema({
//     name: {type:String,required:true},
//     description: {type:String,required:true},
//     price: {type:Number,required:true},
//     image: {type:String,required:true},
//     category: {type:String,required:true}
// })

// const foodModel = mongoose.models.food || mongoose.model("food",foodSchema);

// export default foodModel;

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Definindo o modelo de comida
const foodModel = sequelize.define('Food', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'foods', // Nome da tabela no banco de dados
    timestamps: false // Não usar timestamps automáticos
});

export default foodModel;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name:{type:String,required:true},
//     email:{type:String,required:true,unique:true},
//     password:{type:String,required:true},
//     cartData:{type:Object,default:{}},
// },{minimize:false})

// const userModel = mongoose.models.user || mongoose.model("user",userSchema);

// export default userModel;

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Definindo o modelo do usuário
const userModel = sequelize.define('User', {
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

export default userModel;

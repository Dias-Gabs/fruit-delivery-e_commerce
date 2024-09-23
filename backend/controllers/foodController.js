// import foodModel from "../models/foodModel.js";
// import fs from 'fs';


// // Add food item
// const addFood = async (req,res) => {

//     if (!req.file) {
//         return res.status(400).json({ success: false, message: "Nenhuma imagem enviada." });
//     }

//     let image_filename = `${req.file.filename}`;

//     const food = new foodModel({
//         name:req.body.name,
//         description:req.body.description,
//         price:req.body.price,
//         category:req.body.category,
//         image:image_filename
//     })

//     try {
//         await food.save();
//         res.json({success:true,message:"- #LOG: Food Added"})
//     } catch (error){
//         console.log(error)
//         res.json({success:false,message:"- #LOG-ERROR: Error in the const 'addFood', try-catch method. (File: '../backend/controllers/foodController.js'."})
//     }

// }

// // All food list
// const listFood = async(req,res) => {
//     try {
//         const foods = await foodModel.find({});
//         res.json({success:true,data:foods})
//     } catch (error){
//         console.log(error);
//         res.json({success:false,message:"- #LOG-ERROR: Error in the const 'listFood', try-catch method. (File: '../backend/controllers/foodController.js'."})
//     }
// }

// // Remove food item
// const removeFood = async(req,res) => {
//     try{
//         const food = await foodModel.findById(req.body.id);
//         if (!food) {
//             return res.status(404).json({ success: false, message: "Comida não encontrada." });
//         }
//         fs.unlink(`uploads/${food.image}`,()=>{});

//         await foodModel.findByIdAndDelete(req.body.id);
//         res.json({success:true,message:"- #LOG: Food removed!"})
//     } catch (error){
//         console.log(error);
//         res.json({success:false,message:"- #LOG-ERROR: Error in the const 'removeFood' in the file '../backend/controllers/foodController.js'."})
//     }
// }

// export {addFood,listFood,removeFood}

import foodModel from '../models/foodModel.js';

// Obter todos os alimentos
const getAllFoods = async (req, res) => {
    try {
        const foods = await foodModel.findAll();
        res.json({ success: true, foods });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Erro ao obter alimentos" });
    }
}

// Adicionar um novo alimento
const addFoodItem = async (req, res) => {
    const { name, price, description, category } = req.body;

    try {
        const newFood = await foodModel.create({ name, price, description, category });
        res.json({ success: true, message: "Alimento adicionado com sucesso", newFood });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Erro ao adicionar alimento" });
    }
}

// Atualizar um alimento existente
const updateFoodItem = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    try {
        const food = await foodModel.findByPk(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Alimento não encontrado" });
        }

        food.name = name || food.name;
        food.price = price || food.price;
        food.description = description || food.description;
        food.category = category || food.category;

        await food.save();
        res.json({ success: true, message: "Alimento atualizado com sucesso", food });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Erro ao atualizar alimento" });
    }
}

// Deletar um alimento existente
const deleteFoodItem = async (req, res) => {
    const { id } = req.params;

    try {
        const food = await foodModel.findByPk(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Alimento não encontrado" });
        }

        await food.destroy();
        res.json({ success: true, message: "Alimento deletado com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Erro ao deletar alimento" });
    }
}

// Exportando todas as funções
export { getAllFoods, addFoodItem, updateFoodItem, deleteFoodItem };


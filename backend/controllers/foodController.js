import foodModel from "../models/foodModels.js";
import fs from 'fs';

// Add food item
const addFood = async (req,res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try {
        await food.save();
        res.json({sucess:true,message:"- #LOG: Food Added"})
    } catch (error){
        console.log(error)
        res.json({sucess:false,message:"- #LOG-ERROR: Error in the const 'addFood', try-catch method. (File: '../backend/controllers/foodController.js'."})
    }

}

// All food list
const listFood = async(req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({sucess:true,data:foods})
    } catch (error){
        console.log(error);
        res.json({sucess:false,message:"- #LOG-ERROR: Error in the const 'listFood', try-catch method. (File: '../backend/controllers/foodController.js'."})
    }
}

// Remove food item
const removeFood = async(req,res) => {
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({sucess:true,message:"- #LOG: Food removed!"})
    } catch (error){
        console.log(error);
        res.json({sucess:false,message:"- #LOG-ERROR: Error in the const 'removeFood' in the file '../backend/controllers/foodController.js'."})
    }
}

export {addFood,listFood,removeFood}
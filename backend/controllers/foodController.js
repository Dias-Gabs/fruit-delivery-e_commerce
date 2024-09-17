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
        res.json({sucess:true,message:"Food Added"})
    } catch (error){
        console.log(error)
        res.json({sucess:false,message:"Error"})
    }

}

export {addFood}
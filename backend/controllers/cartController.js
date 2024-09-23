import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Adicionado ao carinho!"})
    }
    catch (error) {
        res.json({success:false,message:"Erro"})
    }
}

// Remove items from user cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removido do carrinho"})
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Erro"})
    }
}

// Fetch user cart data
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    }
    catch (error) {
        console.log(error)
        res.json({success:false,message:"Erro"})
    }
}

export {addToCart,removeFromCart,getCart}
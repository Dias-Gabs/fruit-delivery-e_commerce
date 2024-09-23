// import userModel from "../models/userModel.js";

// // Add items to user cart
// const addToCart = async (res,req) => {
//     try {
//         let userData = await userModel.findById({_id:req.body.userId});
//         let cartData = await userData.cartData;
//         if(!cartData[req.body.itemId]){
//             cartData[req.body.itemId] = 1
//         }
//         else {
//             cartData[req.body.itemId] += 1;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//         res.json({success:true,message:"Adicionado ao carinho!"})
//     }
//     catch (error) {
//         res.json({success:false,message:"Erro"})
//     }
// }

// // Remove items from user cart
// const removeFromCart = async (req,res) => {
//     try {
//         let userData = await userModel.findById(req.body.userId);
//         let cartData = await userData.cartData;
//         if(cartData[req.body.itemId]>0){
//             cartData[req.body.itemId] -= 1;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//         res.json({success:true,message:"Removido do carrinho"})
//     }
//     catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Erro"})
//     }
// }

// // Fetch user cart data
// const getCart = async (req,res) => {
//     try {
//         let userData = await userModel.findById(req.body.userId);
//         let cartData = await userData.cartData;
//         res.json({success:true,cartData})
//     }
//     catch (error) {
//         console.log(error)
//         res.json({success:false,message:"Erro"})
//     }
// }

// export {addToCart,removeFromCart,getCart}

// controllers/cartController.js
import Cart from "../models/cartModel.js"; // Importe o modelo do carrinho

// Função para adicionar um item ao carrinho
export const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body; // Assumindo que esses dados vêm do corpo da requisição
    try {
        const existingCartItem = await Cart.findOne({ where: { userId, productId } });
        
        if (existingCartItem) {
            // Se o item já estiver no carrinho, atualize a quantidade
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return res.json({ success: true, message: "Quantidade atualizada", item: existingCartItem });
        }

        // Caso contrário, crie um novo item no carrinho
        const newCartItem = await Cart.create({ userId, productId, quantity });
        res.json({ success: true, message: "Item adicionado ao carrinho", item: newCartItem });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Erro ao adicionar item ao carrinho", error });
    }
};

// Função para atualizar a quantidade de um item no carrinho
export const updateCartItem = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const cartItem = await Cart.findOne({ where: { userId, productId } });
        
        if (!cartItem) {
            return res.json({ success: false, message: "Item não encontrado no carrinho" });
        }

        cartItem.quantity = quantity;
        await cartItem.save();
        res.json({ success: true, message: "Quantidade atualizada", item: cartItem });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Erro ao atualizar item no carrinho", error });
    }
};

// Função para remover um item do carrinho
export const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const cartItem = await Cart.findOne({ where: { userId, productId } });
        
        if (!cartItem) {
            return res.json({ success: false, message: "Item não encontrado no carrinho" });
        }

        await cartItem.destroy();
        res.json({ success: true, message: "Item removido do carrinho" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Erro ao remover item do carrinho", error });
    }
};

// Função para listar os itens do carrinho
export const listCartItems = async (req, res) => {
    const { userId } = req.params;
    try {
        const cartItems = await Cart.findAll({ where: { userId } });
        res.json({ success: true, items: cartItems });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Erro ao listar itens do carrinho", error });
    }
};

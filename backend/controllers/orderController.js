import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing user order for frontend  
const placeOrder = async (req,res) => {

    const frontend_url = "http://localhost:5173"

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        const line_items = req.body.items.map((item)=> ({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"brl",
                product_data:{
                    name:"Taxas de delivery"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })
        
        const session = await stripe.Checkout.sessiosn.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true,session_url:session.url})

    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Erro"})
    }
}

const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    try{
        if (success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Pago com sucesso!"})
        }
        else {
            await orderModel.findOneAndDelete(orderId);
            res.json({success:false,message:"Pagamento não efetuado!"})
        }
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Erro"})
    }
}

// User orders for frontend
    const userOrders = async (req,res) => {

        try{
            const orders = await orderModel.find({userId:req.body.userId});
            res.json({success:true,data:orders})
        }   
        catch (error) {
            console.log(eror);
            res.json({success:false,message:"Erro"})
        }
}

// Listing orders for admin panel
const listOrders = async (req,res) => {
    try{
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Erro"})
    }
}

const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status atualizado!"});
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Erro"})
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus} 
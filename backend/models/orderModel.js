import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    itens:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Processando produtos"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,required:true},
})

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema)
export default orderModel;
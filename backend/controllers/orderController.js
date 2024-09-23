import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Criar um novo pedido (simplificado)
const createOrder = async (req, res) => {
    const { userId, items, amount, address } = req.body;
    try {
        const newOrder = await orderModel.create({
            userId,
            items,
            amount,
            address,
            createdAt: new Date(), // Adicionando a data de criação
        });

        res.status(201).json({ success: true, order: newOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Erro ao criar o pedido" });
    }
};

// Obter um pedido por ID
const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await orderModel.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Pedido não encontrado" });
        }
        res.json({ success: true, order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Erro ao obter o pedido" });
    }
};

// Colocar o pedido do usuário para o frontend  
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = await orderModel.create({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await userModel.update({ cartData: {} }, { where: { id: req.body.userId } });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Taxas de delivery"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder.id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder.id}`
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Erro" });
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.update({ payment: true }, { where: { id: orderId } });
            res.json({ success: true, message: "Pago com sucesso!" });
        } else {
            await orderModel.destroy({ where: { id: orderId } });
            res.json({ success: false, message: "Pagamento não efetuado!" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Erro" });
    }
}

export { createOrder, getOrderById, placeOrder, verifyOrder };
 
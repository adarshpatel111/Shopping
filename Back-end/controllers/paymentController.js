import Stripe from 'stripe';
import Order from '../models/orderModel.js';
import env from 'dotenv';
env.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getPaymentDetails = async (req, res) => {
    console.log(req.body);
    
    try {
        const { products } = req.body;

        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product.title
                },

                unit_amount: Math.round(product.price * 60) // Stripe expects amounts in cents
            },
            quantity: product.quantity
        }));
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONT_URL}/payment-success`,
            cancel_url: `${process.env.FRONT_URL}/payment-cancelled`,
        });
        
        res.json({ id: session.id });
        console.log("Amounts=>",unit_amount)
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

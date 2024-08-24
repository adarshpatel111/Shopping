import Stripe from 'stripe';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Stripe with your secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getPaymentDetails = async (req, res) => {
    try {
        const { products } = req.body;

        // Validate the presence of products
        if (!products || products.length === 0) {
            return res.status(400).json({ error: 'No products provided' });
        }

        // Create line items from the products
        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'inr', // Ensure 'inr' is a valid currency code for your Stripe account
                product_data: {
                    name: product.title,
                },
                unit_amount: Math.round(product.price * 100), // Amount in cents
            },
            quantity: product.quantity,
        }));

        // Create a Checkout Session with the line items
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONT_URL}/payment-success`,
            cancel_url: `${process.env.FRONT_URL}/payment-cancelled`,
        });
        
        // Respond with the session ID
        res.json({ id: session.id });
        
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

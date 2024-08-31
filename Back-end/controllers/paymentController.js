import Stripe from 'stripe';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Endpoint to create a Stripe Checkout session
export const getPaymentDetails = async (req, res) => {
    try {
        const { products, customer, total } = req.body;

        // Validate the presence of products
        if (!products || products.length === 0) {
            return res.status(400).json({ error: 'No products provided' });
        }
        // Currency Converter
        const baseCurrency = 'USD';
        const targetCurrency = 'INR';
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const rate = response.data.rates[targetCurrency];

        if (!rate) {
            return res.status(400).json({ error: `Currency ${targetCurrency} not supported` });
        }

        // res.json({ convertedPrice: convertedPrice.toFixed(2) });
        // Create line items from the products
        // const convertedPrice = products.price * rate;
        const lineItems = products.map((product) => {
            const convertedPrice = Math.round(product.price * rate * 100); // Convert to cents
            return {
                price_data: {
                    currency: 'inr', // Ensure 'inr' is a valid currency code for your Stripe account
                    product_data: {
                        name: product.title,
                        images: [product.image]
                    },
                    unit_amount: convertedPrice, // Amount in cents
                },
                quantity: product.quantity,
            };
        });

        // Create a Checkout Session with the line items
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONT_URL}/payment-cancelled`,
        });

        // Respond with the session ID
        res.json({ id: session.id });


    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


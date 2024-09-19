import Stripe from 'stripe';
import env from 'dotenv';
env.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;    // Replace with your Stripe webhook secret

export const webhookController = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const body = req.body; // This will be a Buffer if express.raw() is used correctly

    let event;

    try {
        // Construct the event using the raw body (Buffer) and the signature
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        console.error(`Webhook SLOT OF Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Handle the successful payment intent
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Handle the payment method attachment
            break;
        // Add cases for other event types as needed
        default:
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
};

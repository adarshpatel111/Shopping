import Express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import env from 'dotenv';
import { getAllProductsRoute, getSingleProductsRoute } from './routes/productRoute.js';
import userRoute from './routes/userRoute.js';
import { getPaymentRoute } from './routes/paymentRoute.js';
import { getWebhookRoute } from './routes/webhookRoute.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import Stripe from 'stripe';
import { getOrdersRoute, updateOrderStatusDetails } from './routes/ordersRoute.js';

env.config();


const app = Express();

app.use(Express.json());
app.use(cookieParser())

const frontendUrl = process.env.FRONTEND_URL;
// Configure CORS options
const corsOptions = {
    origin: `${frontendUrl}`, // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5001;
const mongooseURI = process.env.MONGO_URI;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET

mongoose.connect(mongooseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/user', userRoute);
app.use('/', getAllProductsRoute);
app.use('/', getSingleProductsRoute);
app.use('/', getPaymentRoute);
app.use('/', getOrdersRoute);
app.use('/', updateOrderStatusDetails);
// app.use('/api', getWebhookRoute);


// Middleware to parse raw body
app.use(
    bodyParser.raw({ type: 'application/json' })
);

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = STRIPE_ENDPOINT_SECRET; // Replace with your endpoint secret

    try {
        let event;
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            endpointSecret
        )
    } catch (err) {
        console.log(`Webhook Error from stripe=> ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    // ...

    res.json({ received: true });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

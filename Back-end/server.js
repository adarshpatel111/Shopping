import Express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import env from 'dotenv';
import { getAllProductsRoute, getSingleProductsRoute } from './routes/productRoute.js';
import userRoute from './routes/userRoute.js';
import { getPaymentRoute } from './routes/paymentRoute.js';

env.config();


const app = Express();

app.use(Express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;
const mongooseURI = process.env.MONGO_URI;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

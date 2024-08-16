import Express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import env from 'dotenv';
import { getAllProductsRoute, getSingleProductsRoute } from './routes/productRoute.js';
import userRoute  from './routes/userRoute.js';


env.config();

const app = Express();

app.use(Express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;
const mongooseURI = process.env.MONGO_URI;
console.log("mydb", mongooseURI)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
mongoose.connect(mongooseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected...")).catch(err => console.log(err));

//define routes
app.use("/user", userRoute);
app.use('/', getAllProductsRoute);
app.use('/', getSingleProductsRoute);

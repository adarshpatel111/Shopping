import Express from "express";
import cors from "cors";
import mongoose from "mongoose";
import env from "dotenv";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import ordersRoute  from "./routes/ordersRoute.js";
import productsRoute from "./routes/productRoute.js";

env.config();

const app = Express();

app.use(Express.json());
app.use(cookieParser());

const frontendUrl = process.env.FRONTEND_URL;
// Configure CORS options
const corsOptions = {
  origin: `${frontendUrl}`,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(Express.urlencoded({ limit: "500mb", extended: true }));

const PORT = process.env.PORT || 5001;
const mongooseURI = process.env.MONGO_URI;

mongoose
  .connect(mongooseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/user", userRoute);
app.use("/products", productsRoute);
app.use("/orders", ordersRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

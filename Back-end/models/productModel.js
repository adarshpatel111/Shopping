import Mongoose from "mongoose";

const productsSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      rate: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    quantity: {
      type: Number,
      required: true,
      default: 0, // You can set a default value if desired
    },
  },
  { timestamps: true }
);

// Create model for export schema
const ProductsData = Mongoose.model("Products", productsSchema);

export default ProductsData;

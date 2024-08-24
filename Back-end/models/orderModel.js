import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    customer: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple email regex
                },
                message: props => `${props.value} is not a valid email!`
            }
        }
    },
    products: [{
        id: {
            type: mongoose.Schema.Types.ObjectId, // Assuming product IDs are ObjectIds
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        image: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^https?:\/\/[^\s]+$/.test(v); // Simple URL regex
                },
                message: props => `${props.value} is not a valid URL!`
            }
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        itemTotal: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    total: {
        type: Number,
        required: true,
        min: 0
    }
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;

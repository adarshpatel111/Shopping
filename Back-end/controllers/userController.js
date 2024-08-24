import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import env from 'dotenv';
env.config();

// Helper function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expiration time
    );
};

export const signUpUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const createdUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });
        await createdUser.save();

        // Generate token after successful sign up
        const token = generateToken(createdUser);

        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                firstName: createdUser.firstName,
                lastName: createdUser.lastName,
                email: createdUser.email
            },
            token // Send token with response
        });
    } catch (error) {
        console.log("Error from Usercontroller", error);
        res.status(500).json(error);
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token after successful login
        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            token // Send token with response
        });
    } catch (error) {
        console.log("Error from UserLogincontroller", error);
        res.status(500).json(error);
    }
};

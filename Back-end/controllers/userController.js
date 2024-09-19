import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import env from 'dotenv';
env.config();


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


        res.status(200).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                firstName: createdUser.firstName,
                lastName: createdUser.lastName,
                email: createdUser.email
            },
        });
    } catch (error) {
        console.log("Error from Usercontroller", error);
        res.status(500).json(error);
    }
};
export const userChangePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        const user = await User.findByOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

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

        // Adjust token expiration times as needed
        const accessTOKEN = jwt.sign(
            { id: user._id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15s' } // Token expiration time
        );
        const refreshTOKEN = jwt.sign(
            { id: user._id, email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1m' } // Token expiration time
        );

        // Set the refresh token as a cookie
        res.cookie('jwt', refreshTOKEN, {
            httpOnly: true,
            secure: false,
            sameSite: 'None', // Ensure cross-site requests are handled properly
            maxAge: 1 * 60 * 1000, //It should in Numeric value only
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            token: {
                access_token: accessTOKEN,
            },
        });

    } catch (error) {
        console.log("Error from UserLogin controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const refresh = async (req, res) => {
    try {
        const cookies = req.cookies;

        if (!cookies?.jwt) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const refreshToken = cookies.jwt;

        // Verify the refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden: Invalid token" });
            }

            // Find the user by ID
            const foundUser = await User.findById(decoded.id);
            if (!foundUser) {
                return res.status(401).json({ message: "Unauthorized: User not found" });
            }

            // Generate a new access token
            const accessToken = jwt.sign(
                {
                    email: foundUser.email,
                    id: foundUser._id
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15s" } // Adjust the expiration time as needed
            );

            // Send the new access token
            res.json({ accessToken });
        });
    } catch (error) {
        console.error("Error during token refresh:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    const cookies = req.cookies;

    console.log("Cookies received:", req.cookies);

    // Check if 'jwt' cookie exists
    if (!cookies?.jwt) {
        return res.sendStatus(204); // No content
    }
    else {
        console.log('Logout request received');


        // Clear the cookie
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: false, // Change to true if using HTTPS
            sameSite: 'None' // Change as needed
        });

        // Send response
        res.json({ message: 'Cookie cleared' });
    }
}



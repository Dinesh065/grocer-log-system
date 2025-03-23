import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import DemoUser from "../models/demo.models.js";
import bcrypt from "bcrypt"
import zod from "zod"
const router = Router();

const signupSchema = zod.object({
    firstName: zod.string()
        .min(3, "First name must be at least 3 characters long")
        .regex(/^[A-Za-z]+$/, "First name must only contain letters"),

    lastName: zod.string()
        .min(3, "Last name must be at least 3 characters long")
        .regex(/^[A-Za-z]+$/, "Last name must only contain letters"),

    email: zod.string().email(),
    
    password: zod.string()
        .min(6, "Password must be at least 6 characters long")
        .regex(/^[a-zA-Z0-9]*$/, "Password must be alphanumeric"),
});


router.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const response = signupSchema.safeParse(req.body);
    if (!response.success) {
        return res.status(400).json({ 
            message: "Invalid details", 
            errors: response.error.format() 
        });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ statusCode: 400, message: "User already exists" });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
        });

        await newUser.save();

        res
            .status(201)
            .json({ statusCode: 201, success: true, message: "User created successfully" });
    } catch (error) {
        console.error("Error during signup:", error.message);
        res
            .status(500)
            .json({ statusCode: 500, success: false, message: "Internal server error", error: error.message });
    }
});

router.get('/me', verifyJWT, async (req, res) => {
    try {
        const user = req.user;
        res.json(user);
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put("/me", verifyJWT, async (req, res) => {
    try {
        const { firstName, lastName, groceryName, groceryAddress, phoneNumber } = req.body;

        const updateData = {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(groceryName && { groceryName }),
            ...(groceryAddress && { groceryAddress }),
            ...(phoneNumber && { phoneNumber }),
        };

        const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
            new: true,
        });

        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user data:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

router.put("/change-password", verifyJWT, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Both old and new passwords are required." });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect." });
        }

        user.password = newPassword;
        await user.save();

        console.log("Password updated successfully for user:", user.email);
        res.json({ message: "Password updated successfully." });
    } catch (error) {
        console.error("Error changing password:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

router.post('/demo', async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await DemoUser.findOne({ email });
        if (existingUser) {
            throw new ApiError(400, 'Email already used for demo');
        }

        const newDemoUser = new DemoUser({ email });

        await newDemoUser.save();

        res.status(201).json(new ApiResponse(201, newDemoUser, 'Demo user added successfully'));
    } catch (error) {
        res.status(500).json(new ApiError(500, error.message));
    }
});

router.get('/userInfo', verifyJWT, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("firstName email");
        if (!user) return res.status(404).json({ message: "User Not Found" });

        res.json({ name: user.firstName, email: user.email });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.route("/")
router.route("/api/addnewitem")
export default router;
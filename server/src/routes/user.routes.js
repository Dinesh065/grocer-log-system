import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/user.controller.js";
import { validate } from "../models/user.model.js";
import { User } from "../models/user.model.js";
import multer from "multer";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import DemoUser from "../models/demo.models.js";

const router = Router();

router.post("/signup", async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	try {
		// Check if the user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(400)
				.json({ statusCode: 400, message: "User already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Create a new user
		const newUser = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		// Save the user to the database
		await newUser.save();

		// Generate a JWT token
		const token = jwt.sign({ id: newUser._id }, process.env.JWTPRIVATEKEY, {
			expiresIn: "1h",
		});

		res
			.status(201)
			.json({ statusCode: 201, success: true, data: { token }, message: "User created successfully" });
	} catch (error) {
		console.error("Error during signup:", error.message); // Log error to console
		res
			.status(500)
			.json({ statusCode: 500, success: false, message: "Internal server error", error: error.message });
	}
});


// Route for getting user profile
router.get('/me', verifyJWT, async (req, res) => {
	try {
		// Since user data is now available in req.user (due to verifyJWT middleware)
		const user = req.user;
		res.json(user); // Send user data in response
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
});


// Route for updating user profile
router.put('/me', verifyJWT, upload.single('profilePicture'), async (req, res) => {
	try {
		const user = req.user; // Access the authenticated user from req.user (set by verifyJWT)
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Extract new profile data
		const { name } = req.body;
		const profilePicture = req.file ? `/uploads/${req.file.filename}` : user.profilePicture;

		// Update user data
		user.name = name || user.name;
		user.profilePicture = profilePicture;

		await user.save(); // Save updated data to the database

		res.json({ message: 'Profile updated successfully', user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
});

router.post('/demo', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await DemoUser.findOne({ email });
        if (existingUser) {
            throw new ApiError(400, 'Email already used for demo');
        }

        // Create a new demo user
        const newDemoUser = new DemoUser({ email });

        // Save the demo user to the database
        await newDemoUser.save();

        res.status(201).json(new ApiResponse(201, newDemoUser, 'Demo user added successfully'));
    } catch (error) {
        res.status(500).json(new ApiError(500, error.message));
    }
});


// router.route("/auth/login").post(loginUser);
// router.route("/auth/register").post(registerUser);
// http://localhost:8000/api/v1/auth/login
router.route("/")
router.route("/api/addnewitem")


//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router;
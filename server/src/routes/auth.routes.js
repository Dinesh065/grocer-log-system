import express from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
	try {

		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(401).send({ message: "Invalid Email or Password" });
		}

		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (!validPassword) {
			return res.status(401).send({ message: "Invalid Email or Password" });
		}

		const token = jwt.sign(
			{ id: user._id, email: user.email, role: user.role },
			process.env.JWTPRIVATEKEY,
			{ expiresIn: "1h" }
		);

        try {
            const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        } catch (err) {
            console.error("Token validation failed:", err.message);
        }
		res.status(200).send({ data: token, message: "Logged in successfully" });
	} catch (error) {
		console.error("Error during login:", error); 
		res.status(500).send({ message: "Internal Server Error" });
	}
});

export default router;
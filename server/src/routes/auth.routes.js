import express from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import zod from "zod";
dotenv.config();

const router = express.Router();

//userInput Validation
const signInSchema = zod.object({
	email: zod.string().email(),
	password: zod.string().min(6).regex(/^[a-zA-Z0-9]*$/, "Password must be alphanumeric")
})

router.post("/login", async (req, res) => {
	try {
		// const {email,password} = req.body;
		const response = signInSchema.safeParse(req.body);
 		if(!response.success){
			return res.status(401).send({ message: "Invalid Email or Password Provided" });
		}

		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(401).send({ message: "Wrong Email or Password" });
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

		res.status(200).send({ data: token, message: "Logged in successfully" });
	} catch (error) {
		console.error("Error during login:", error); 
		res.status(500).send({ message: "Internal Server Error" });
	}
});

export default router;
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8000/api/v1/users/signup";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			} else {
				setError("An unexpected error occurred. Please try again later.");
			}
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
			<div className="flex flex-col lg:flex-row w-full max-w-2xl rounded-lg shadow-lg bg-white">
				{/* Left Section */}
				<div className="flex-1 flex flex-col items-center justify-center bg-teal-500 text-white rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none p-6">
					<h1 className="text-2xl md:text-3xl font-bold mb-4">Welcome Back</h1>
					<Link to="/login">
						<button className="w-36 md:w-44 py-2 md:py-3 bg-white text-teal-500 font-bold rounded-full hover:bg-gray-100 transition">
							Sign in
						</button>
					</Link>
				</div>

				{/* Right Section */}
				<div className="flex-2 flex flex-col items-center justify-center bg-white rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none p-6">
					<form
						className="flex flex-col items-center w-full"
						onSubmit={handleSubmit}
					>
						<h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
							Create Account
						</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className="w-full max-w-xs md:max-w-sm p-3 md:p-4 mb-3 rounded-lg bg-gray-200 text-sm"
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className="w-full max-w-xs md:max-w-sm p-3 md:p-4 mb-3 rounded-lg bg-gray-200 text-sm"
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="w-full max-w-xs md:max-w-sm p-3 md:p-4 mb-3 rounded-lg bg-gray-200 text-sm"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="w-full max-w-xs md:max-w-sm p-3 md:p-4 mb-3 rounded-lg bg-gray-200 text-sm"
						/>
						{error && (
							<div className="w-full max-w-xs md:max-w-sm p-3 md:p-4 mb-3 bg-red-500 text-white rounded-lg text-center text-sm">
								{error}
							</div>
						)}
						<button
							type="submit"
							className="w-36 md:w-44 py-2 md:py-3 bg-teal-500 text-white font-bold rounded-full hover:bg-teal-600 transition"
						>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
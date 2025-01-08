import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8000/api/v1/auth/login";
			const { data: res } = await axios.post(url, data, {
				withCredentials: true, // Include cookies in requests
			});
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="w-[900px] h-[500px] flex rounded-lg shadow-lg">
				{/* Left Side */}
				<div className="flex-2 flex flex-col items-center justify-center bg-white rounded-l-lg">
					<form
						className="flex flex-col items-center"
						onSubmit={handleSubmit}
					>
						<h1 className="text-4xl mb-6">Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="outline-none border-none w-[370px] p-4 rounded-lg bg-gray-200 mb-3 text-sm"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="outline-none border-none w-[370px] p-4 rounded-lg bg-gray-200 mb-3 text-sm"
						/>
						{error && (
							<div className="w-[370px] p-4 mb-3 text-sm bg-red-500 text-white rounded-md text-center">
								{error}
							</div>
						)}
						<button
							type="submit"
							className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-green-600 transition"
						>
							Sign In
						</button>
					</form>
				</div>

				{/* Right Side */}
				<div className="flex-1 flex flex-col items-center justify-center bg-green-500 rounded-r-lg">
					<h1 className="text-4xl text-white mb-6">Do not have account?</h1>
					<Link to="/signup">
						<button
							type="button"
							className="bg-white text-green-500 px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition"
						>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;

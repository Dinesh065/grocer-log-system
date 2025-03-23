import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${API_BASE_URL}/auth/login`;
			const response = await axios.post(url, data, { withCredentials: false });
			localStorage.setItem("token", response.data.data);
			window.location = "/";
		} catch (error) {
			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				console.error("Error message:", error.response.data.message);
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className="w-full min-h-screen bg-[#050a14] flex items-center justify-center p-4">
			<div className="w-full max-w-[90%] md:max-w-[750px] lg:max-w-[900px] h-auto flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden">
				{/* Left Section */}
				<div className="flex-1 flex flex-col items-center justify-center bg-[#0d1321] p-6 md:p-10">
					<form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
						<h1 className="text-bold text-2xl md:text-4xl mb-6 text-white">Welcome Back</h1>

						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="outline-none border-none w-full max-w-[350px] p-4 rounded-lg bg-white text-gray-900 mb-3 text-sm"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="outline-none border-none w-full max-w-[350px] p-4 rounded-lg bg-white text-gray-900 mb-3 text-sm"
						/>

						{/* Error Message */}
						{error && (
							<div className="w-full max-w-[350px] p-4 mb-3 text-sm bg-red-500 text-white rounded-md text-center">
								{error}
							</div>
						)}

						{/* Sign In Button */}
						<button
							type="submit"
							className="bg-slate-200 text-gray-900 px-6 py-2 rounded-full text-sm font-bold hover:bg-slate-500 transition w-50% max-w-[200px]"
						>
							Sign In
						</button>
					</form>
				</div>

				{/* Right Section */}
				<div className="flex-1 flex flex-col items-center justify-center bg-slate-200 p-6 md:p-10 text-center">
					<h1 className="text-bold text-2xl md:text-4xl text-black mb-6">Don't have an account?</h1>
					<Link to="/signup">
						<button
							type="button"
							className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-black transition w-full max-w-[200px]"
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

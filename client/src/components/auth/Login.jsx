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
			const response = await axios.post(url, data, { withCredentials: true });
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
		<div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="w-full max-w-[900px] h-auto md:h-[500px] flex rounded-lg shadow-lg overflow-hidden">
				<div className="flex-1 md:flex-2 flex flex-col items-center justify-center bg-white p-6 md:p-12">
					<form
						className="flex flex-col items-center w-full"
						onSubmit={handleSubmit}
					>
						<h1 className="text-2xl md:text-4xl mb-6">Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="outline-none border-none w-full md:w-[370px] p-4 rounded-lg bg-gray-200 mb-3 text-sm"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="outline-none border-none w-full md:w-[370px] p-4 rounded-lg bg-gray-200 mb-3 text-sm"
						/>
						{error && (
							<div className="w-full md:w-[370px] p-4 mb-3 text-sm bg-red-500 text-white rounded-md text-center">
								{error}
							</div>
						)}
						<button
							type="submit"
							className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-green-600 transition w-full md:w-auto"
						>
							Sign In
						</button>
					</form>
				</div>

				<div className="flex-1 flex flex-col items-center justify-center bg-green-500 p-6 md:p-12 text-center">
					<h1 className="text-2xl md:text-4xl text-white mb-6">Do not have an account?</h1>
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

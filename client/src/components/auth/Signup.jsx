import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
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
      const url = `${API_BASE_URL}/users/signup`;
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
    <div className="flex items-center justify-center min-h-screen bg-[#050a14] p-6">
      <div className="w-full max-w-md bg-[#0d1321] text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Create Account
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            value={data.firstName}
            required
            className="w-full p-3 mb-3 rounded-lg bg-white text-black"
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            value={data.lastName}
            required
            className="w-full p-3 mb-3 rounded-lg bg-white text-black"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className="w-full p-3 mb-3 rounded-lg bg-white text-black"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className="w-full p-3 mb-3 rounded-lg bg-white text-black"
          />
          {error && (
            <div className="w-full p-3 mb-3 bg-red-500 text-white rounded-lg text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

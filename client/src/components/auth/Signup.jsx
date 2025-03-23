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

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!data.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    } else if (!/^[A-Za-z]+$/.test(data.firstName)) {
      newErrors.firstName = "First name must only contain letters (no numbers or special characters).";
    } else if (data.firstName.length < 3) {
      newErrors.firstName = "First name must be at least 3 characters long.";
    }

    if (!data.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    } else if (!/^[A-Za-z]+$/.test(data.lastName)) {
      newErrors.lastName = "Last name must only contain letters (no numbers or special characters).";
    } else if (data.lastName.length < 3) {
      newErrors.lastName = "Last name must be at least 3 characters long.";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!data.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    } else if (!/^[a-zA-Z0-9]*$/.test(data.password)) {
      newErrors.password = "Password must be alphanumeric (no special characters).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });

    // Dynamic validation while typing
    setErrors((prev) => {
      let newErrors = { ...prev };

      if (input.name === "firstName") {
        if (!input.value.trim()) {
          newErrors.firstName = "First name is required.";
        } else if (/\d/.test(input.value)) {
          newErrors.firstName = "Numbers are not allowed in First Name.";
        } else if (/[^A-Za-z-' ]/.test(input.value)) {
          newErrors.firstName = "Special characters are not allowed in First Name.";
        } else {
          delete newErrors.firstName;
        }
      }

      if (input.name === "lastName") {
        if (!input.value.trim()) {
          newErrors.lastName = "Last name is required.";
        } else if (/\d/.test(input.value)) {
          newErrors.lastName = "Numbers are not allowed in Last Name.";
        } else if (/[^A-Za-z-' ]/.test(input.value)) {
          newErrors.lastName = "Special characters are not allowed in Last Name.";
        } else {
          delete newErrors.lastName;
        }
      }

      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Stop submission if validation fails

    try {
      const url = `${API_BASE_URL}/users/signup`;
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError("An unexpected error occurred. Please try again later.");
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
          <div className="mb-3">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              className="w-full p-3 rounded-lg bg-white text-black"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              className="w-full p-3 rounded-lg bg-white text-black"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>

          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              className="w-full p-3 rounded-lg bg-white text-black"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              className="w-full p-3 rounded-lg bg-white text-black"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {apiError && (
            <div className="w-full p-3 mb-3 bg-red-500 text-white rounded-lg text-center">
              {apiError}
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

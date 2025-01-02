import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: null,  // Add state for file inputs
    coverImage: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],  // Save the file object
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,  // Handle text input
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("fullName", formData.fullName);
    form.append("email", formData.email);
    form.append("username", formData.username);
    form.append("password", formData.password);

    // Append files if they are provided
    if (formData.avatar) {
      form.append("avatar", formData.avatar);  // Add the avatar file
    }
    if (formData.coverImage) {
      form.append("coverImage", formData.coverImage);  // Add the coverImage file if provided
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/auth/register", // Make sure this URL is correct
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",  // Ensure the correct content-type is set
          },
        }
      );
      setMessage("Registration successful!");
    } catch (error) {
      // Catch any errors and show the message
      setMessage("Registration failed: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        {/* <label>Avatar (Profile Image):</label>
        <input
          type="file"
          name="avatar"
          onChange={handleChange}
          required
        />

        <label>Cover Image (Optional):</label>
        <input
          type="file"
          name="coverImage"
          onChange={handleChange}
        /> */}
        
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;

import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        profilePicture: "",  // This will store the URL of the profile picture
    });
    const [error, setError] = useState("");
    const [imagePreview, setImagePreview] = useState("");  // To preview image before upload
    const [imageFile, setImageFile] = useState(null); // To hold the file selected by user

    // Fetch user data (GET)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get("http://localhost:8000/api/v1/users/me", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token to authenticate
                    },
                });
                setUser(data); // Set user data to state
                setImagePreview(data.profilePicture || "/default-profile.jpg"); // Set default if no profile picture
            } catch (err) {
                setError("Failed to load user data.");
            }
        };
        fetchUser();
    }, []); // Only run this effect on component mount

    // Handle input changes (name)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Handle image file selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file)); // Preview the selected image
        }
    };

    // Handle form submission (PUT request to update profile)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", user.name);
            formData.append("profilePicture", imageFile); // Append the selected image file

            await axios.put(
                "http://localhost:8000/api/v1/users/me", // PUT endpoint to update profile
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token for authentication
                        "Content-Type": "multipart/form-data", // Required for file uploads
                    },
                }
            );
            alert("Profile updated successfully!");
        } catch (err) {
            setError("Failed to update profile.");
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Profile</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col items-center">
                    <label htmlFor="profilePicture" className="mb-4">
                        <img
                            src={imagePreview}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                        />
                    </label>
                    <input
                        type="file"
                        id="profilePicture"
                        name="profilePicture"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        disabled
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white rounded-md py-2 px-4 hover:bg-green-600"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Profile;

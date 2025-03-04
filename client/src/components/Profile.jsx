import { useState, useEffect } from "react";
import axios from "axios";
import { Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Footer from "./Footer";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    groceryName: "",
    groceryAddress: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [editingFields, setEditingFields] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/v1/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(data);
      } catch (err) {
        setError("Failed to load user data.");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const toggleEdit = (field) => {
    setEditingFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        firstName: user.firstName,
        lastName: user.lastName,
        groceryName: user.groceryName,
        groceryAddress: user.groceryAddress,
        phoneNumber: user.phoneNumber,
      };

      const { data } = await axios.put("http://localhost:8000/api/v1/users/me", updateData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      setUser(data);
      setEditingFields({});
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };


  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      if (!oldPassword || !newPassword) {
        alert("Both old and new passwords are required.");
        return;
      }

      await axios.put(
        "http://localhost:8000/api/v1/users/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOldPassword("");
      setNewPassword("");
      alert("Password updated successfully!");
    } catch (err) {
      console.error("Failed to update password:", err.response?.data?.message || err.message);
      setError("Failed to update password.");
    }
  };


  return (
    <div className="bg-[#050a14] pt-3">
      <div className="p-8 mb-3 max-w-lg mx-auto bg-[#0d1321] shadow-[0px_4px_10px_rgba(0,0,0,0.7)] rounded-xl space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-white">My Profile</h1>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {[
            { label: "First Name", field: "firstName" },
            { label: "Last Name", field: "lastName" },
            { label: "Email", field: "email", disabled: true },
            { label: "Grocery Name", field: "groceryName" },
            { label: "Business Address", field: "groceryAddress" },
            { label: "Phone Number", field: "phoneNumber" },
          ].map(({ label, field, disabled }) => (
            <div key={field} className="flex items-center justify-between">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300">{label}</label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={user[field] || ""}
                  onChange={handleChange}
                  disabled={disabled || !editingFields[field]}
                  className={`border border-gray-600 rounded-md p-2 w-full bg-[#1a2235] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !editingFields[field] && "bg-gray-700 text-gray-400"
                    }`}
                />
              </div>
              {!disabled && (
                <Tooltip title={editingFields[field] ? "Save" : "Edit"} arrow>
                  <IconButton
                    onClick={() => toggleEdit(field)}
                    color={editingFields[field] ? "primary" : "default"}
                  >
                    {editingFields[field] ? <SaveIcon /> : <EditIcon />}
                  </IconButton>
                </Tooltip>
              )}
            </div>
          ))}

          <div>
            <h2 className="text-lg font-bold text-white mb-2">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Old Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="border border-gray-600 rounded-md p-2 w-full bg-[#1a2235]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border border-gray-600 rounded-md p-2 w-full bg-[#1a2235]"
                />
              </div>
              <button
                onClick={handlePasswordChange}
                className="bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 w-full"
              >
                Update Password
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg py-2 px-4 text-lg font-semibold shadow-md hover:from-green-500 hover:to-green-600"
          >
            Save Changes
          </button>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
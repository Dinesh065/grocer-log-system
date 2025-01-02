import React from "react";
import SearchBar from "./Searchbar";
import { IconButton } from "@mui/material";
import NotificationIcon from '@mui/icons-material/Notifications';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
    const navigate = useNavigate(); // Hook for navigation

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the Login page
    };

    return (
        <div className="flex justify-between items-center p-2">
            <div className="flex items-center space-x-4 w-full">
                <SearchBar />
                <IconButton
                    sx={{
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: '#e3b788',  
                        },
                        transition: 'background-color 0.3s ease-in-out', 
                    }}
                >
                    <NotificationIcon style={{ color: '#FFD700' }} />
                </IconButton>
                {/* <IconButton
                    sx={{
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: '#e3b788',  
                        },
                        transition: 'background-color 0.3s ease-in-out', 
                    }}
                    onClick={handleLoginClick} // Handle click to navigate
                >
                    <LoginIcon style={{ color: '#FFD700' }} />
                </IconButton> */}
            </div>
        </div>
    );
};

export default DashboardHeader;

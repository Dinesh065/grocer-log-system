import React from "react";
import SearchBar from "./Searchbar";
import { IconButton } from "@mui/material";
import NotificationIcon from '@mui/icons-material/Notifications';

const DashboardHeader = () => {
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
            </div>
        </div>
    );
};

export default DashboardHeader;

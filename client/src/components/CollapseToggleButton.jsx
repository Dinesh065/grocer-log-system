import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";

const CollapseToggleButton = ({ onClick }) => {
    return (
        <IconButton onClick={onClick} className="mb-[20px]">
            <MenuIcon className="text-black ml-[8px]"/>
        </IconButton>
    )
}

export default CollapseToggleButton;
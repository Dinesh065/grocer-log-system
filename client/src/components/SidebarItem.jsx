import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ to, icon: Icon, text, iconColor, collapsed }) => {
    return (
        <ListItem component={Link} to={to} className="py-2 px-4 hover:bg-gray-300 hover:rounded-full">
            <ListItemIcon className={`min-w-max ${collapsed ? 'justify-center ml-[-18px] rounded-full' : 'ml-0'}`}>
                <Icon style={{ color: iconColor }} />
            </ListItemIcon>
            {!collapsed && <ListItemText primary={text} className="text-gray-700" />}
        </ListItem>
    );
}

export default SidebarItem;

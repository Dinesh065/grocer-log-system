import React, { useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Correct Profile icon
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import SalesIcon from '@mui/icons-material/AttachMoney';
import CreditIcon from '@mui/icons-material/AccountBalanceWallet';
import SidebarItem from "./SidebarItem";
import CollapseToggleButton from "./CollapseToggleButton";

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    }

    return (
        <div style={{ width: collapsed ? '90px' : '250px', height: '100vh', backgroundColor: 'bisque', padding: '20px', boxShadow: '20px 0 5px rgba(0,0,0,0.1)' }}>
            <h2 className={`${!collapsed ? 'text-black font-bold text-[20px] mb-[20px] ml-[18px]' : 'font-bold text-center mb-[20px]'}`}>Grocery Log</h2>

            <CollapseToggleButton onClick={toggleSidebar} />

            <List>
                <SidebarItem to='/' icon={DashboardIcon} text='Dashboard' iconColor='#1976d2' collapsed={collapsed} />
                <SidebarItem to='/inventory' icon={InventoryIcon} text='Inventory' iconColor='#388e3c' collapsed={collapsed} />
                <SidebarItem to='/sales' icon={SalesIcon} text='Sales Log' iconColor='#ff5722' collapsed={collapsed} />
                <SidebarItem to='/credits' icon={CreditIcon} text='Customer Credit Log' iconColor='#673ab7' collapsed={collapsed} />
                <SidebarItem to='/profile' icon={AccountCircleIcon} text='Profile' iconColor='#009688' collapsed={collapsed} />
                <SidebarItem to='/logout' icon={LogoutIcon} text='Log Out' iconColor='#e53935' collapsed={collapsed}/>
            </List>
        </div>
    )
}

export default Sidebar;

import React from 'react';
import Navbar from './Navbar';

interface SidebarProps {
    asideVisible?: boolean;
}

    const Sidebar: React.FC<SidebarProps> = ({ asideVisible = true }) => {
    return (
        <aside
        className={`fixed z-50 md:translate-x-0 md:relative md:block bottom-0 left-0 w-64 h-full ${
            asideVisible? 'block transition-transform' : 'transition-transform -translate-x-full'
        }`}
        >
        <Navbar />
        </aside>
    );
};

export default Sidebar;
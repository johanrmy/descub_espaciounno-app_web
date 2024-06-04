import React, { useState } from 'react';
import Sidebar from './nav-side/Sidebar';
import Header from './nav-side/Header'

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [asideVisible, setAsideVisible] = useState(false);

    const toggleAside = () => {
        setAsideVisible(!asideVisible);
    };

    return (
        <>
        <div className="h-screen grid grid-rows-[auto,1fr] md:grid-cols-[auto,1fr] md:grid-rows-1 bg-dark_ud-100">
            <Sidebar asideVisible={asideVisible}/>
            <Header onClick={toggleAside}/>
            <main className={`col-span-1 md:col-span-1 md:blur-0 overflow-x-auto max-w-full p-4 sm:p-6 ${asideVisible ? 'blur-sm' : ''}`}>
            {children}
            </main>

        </div>
        </>
    );
};

export default Layout;
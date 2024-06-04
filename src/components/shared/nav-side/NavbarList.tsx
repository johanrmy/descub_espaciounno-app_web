import React from 'react';
import LogoLink from '@components/shared/extra/LogoUnnoDescubLink';
import Button from '@components/shared/buttons/Button';

interface NavbarlistProps {
    children: React.ReactNode;
    userName: string;
    profile_photo: string;
    onLogout: () => void;
}

const NavbarList: React.FC<NavbarlistProps> = ({ children, userName, profile_photo, onLogout }) => {
    return (
        <div className='h-full px-6 pt-4 pb-6 overflow-y-auto bg-unno_pr-500 flex flex-col'>
            <ul className='space-y-2 font-medium font-roboto text-lg text-dark_ud-100 flex-1'>
                <li className="flex items-center">
                    <LogoLink/>
                </li>
                <nav>
                    {children}
                </nav>
            </ul>
            <div>
                <div className='flex flex-row items-center my-2'>
                    <img src={profile_photo} alt="profile_photo" className='rounded-full h-11 w-11'/>
                    <p className="text-white mb-2 mx-2">{userName}</p>
                </div>
                <Button bg='bg-descub_pr-500' hoverBgClass='hover:bg-descub_pr-400' color={false} onClick={onLogout} className='w-full'>Cerrar sesión</Button>
            </div>
        </div>
    );
};

export default NavbarList;

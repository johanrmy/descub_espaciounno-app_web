import React from 'react';
import LogoLink from '@components/shared/extra/LogoUnnoDescubLink';
import Button from '@components/shared/buttons/Button';
import { CgDetailsMore } from "react-icons/cg";

interface HeaderProps {
    onClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({onClick}) => {


    return (
        <header className="md:col-span-3 block md:hidden h-24">
        <div className='bg-unno_pr-500 h-full flex items-center justify-between px-8'>
            <LogoLink/>
            <Button bg='bg-descub_pr-500' hoverBgClass='hover:bg-descub_pr-400' onClick={onClick}><CgDetailsMore className='h-6 w-6 text-dark_ud-100'/></Button>
        </div>
        </header>
    );
    };

export default Header;
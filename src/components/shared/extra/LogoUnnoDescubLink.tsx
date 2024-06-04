import React from 'react';
import DescubLogoWhite from '@assets/imgs/descub_logo.svg';
import EspacioUnnoLogoWhite from '@assets/imgs/espacio_unno_logo_white.png';
import { Link } from 'react-router-dom';

const LogoLink: React.FC = () => {
    return (
        <Link to="/dashboard" className="md:flex-1 flex flex-row items-center md:justify-around md:mb-3">
            <img src={DescubLogoWhite} alt="descub" className="w-28 h-9" />
            <div className="h-16 min-h-10 w-0.5 bg-white md:mx-1 mx-4"></div>
            <img src={EspacioUnnoLogoWhite} alt="descub" className="w-16 h-16" />
        </Link>
    );
};

export default LogoLink;

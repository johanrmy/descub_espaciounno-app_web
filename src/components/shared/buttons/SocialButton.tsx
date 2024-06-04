import React from 'react';
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

interface SocialButtonProps {
    username: string;
    socialMedia: 'instagram' | 'tiktok' | 'facebook'; // Limitamos las opciones a estas redes sociales
}

const SocialButton: React.FC<SocialButtonProps> = ({ username, socialMedia }) => {

    let url: string = '';
    let red: string = '';
    let className: string = '';
    let icon: React.ReactNode = <></>;
    
    switch (socialMedia) {
        case 'instagram':
            url = `https://www.instagram.com/${username}/`;
            red = 'Instagram';
            className = 'text-[#833ab4] border-[#833ab4] hover:bg-[#833ab4]';
            icon = <FaInstagram size={20}/>
            break;
        case 'tiktok':
            url = `https://www.tiktok.com/@${username}/`;
            red = 'TikTok';
            className = 'text-[#ff0050] border-[#ff0050] hover:bg-[#ff0050]';
            icon = <FaTiktok size={20}/>
            break;
        case 'facebook':
            url = `https://www.facebook.com/${username}/`;
            red = 'Facebook';
            className = 'text-[#1877f2] border-[#1877f2] hover:bg-[#1877f2]';
            icon = <FaFacebook size={20}/>
            break;
        default:
            break;
    }

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className='block lg:mx-10 my-3'>
            <button className={`border w-full flex items-center justify-center hover:text-white rounded-lg py-1 px-4 font-roboto font-normal font-base ${className}`}>
                {icon} <span className='mx-1'/> {red}
            </button>
        </a>
    );
};

export default SocialButton;

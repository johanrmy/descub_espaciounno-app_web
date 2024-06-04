import React from 'react';
import LoaderDescub from '@assets/imgs/loader.png';

interface CardProps {
    children?: React.ReactNode;
    loading?: boolean;
    error?: string | null;
    msgLoader?: string;
    className?: string;
}

const Card: React.FC<CardProps> = ({children, loading= false, error = null, msgLoader="Cargando registro(s)...", className}) => {

    return (
        <>
        
            <div className={`flex flex-col relative rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-5 px-4 sm:px-6 overflow-x-auto w-full break-words bg-white ${className}`}>
                {loading && 
                    <div className='flex justify-center center items-center text-2xl text-dark_ud-800 font-bold p-16 flex-col sm:flex-row'>
                        <img src={LoaderDescub} alt="" className="w-44 h-44 animate-bounce" />
                        <span>{msgLoader}</span>
                    </div>}
                {error && <div className='flex justify-center text-2xl text-dark_ud-800 font-bold p-16'>{error}</div>}
                {!loading && !error && children}
            </div>
        </>
    );
};

export default Card;

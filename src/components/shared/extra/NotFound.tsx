import React from 'react';
import { Link } from 'react-router-dom';
import LogoLink from './LogoUnnoDescubLink';
import Button from '../buttons/Button';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-dark_ud-100">
            <header>
                <div className='flex flex-row h-24 w-full bg-unno_pr-500 justify-center shadow-md'>
                    <div className='h-full w-96 flex items-center justify-center px-8'>
                        <LogoLink />
                    </div>
                </div>
            </header>
            <main className='flex-grow flex items-center justify-center'>
                <div className='flex flex-col justify-center items-center font-nsans mb-40'>
                    <h1 className="text-7xl font-bold text-descub_pr-500 font-roboto">404</h1>
                    <p className="text-2xl mt-4">Página no encontrada.</p>
                    <Link to="/dashboard" className="mt-6 text-blue-500 text-lg">
                        <Button bg='bg-unno_pr-500' hoverBgClass='hover:bg-unno_pr-400' color={false}>Volver al inicio</Button>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default NotFoundPage;

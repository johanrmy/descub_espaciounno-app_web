import React, { useState } from 'react';

interface AlertProps {
    message: string;
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
    const [closed, setClosed] = useState(false);

    const handleClose = () => {
        setClosed(true);
        onClose();
    };

    return (
        <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${closed ? 'hidden' : ''}`} role="alert">
            <span className="block sm:inline"> {message}</span>
            <button type="button" className="absolute top-0 right-0 px-4 py-3" onClick={handleClose}>
                <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <title>Close</title>
                    <path fillRule="evenodd" d="M14.348 14.849a1 1 0 0 1-1.415 1.414l-2.122-2.121-2.121 2.121a1 1 0 0 1-1.415-1.414l2.121-2.121-2.121-2.122a1 1 0 1 1 1.415-1.414l2.121 2.121 2.122-2.121a1 1 0 0 1 1.415 1.414l-2.121 2.121 2.121 2.122z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};

export default Alert;

import React from 'react';

interface RadioInputProps {
    name: string;
    value: string;
    checked?: boolean;
    children?: React.ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    widthClass?: string;
    heightClass?: string;
    backgroundImageUrl?: string;
}

const RadioInput: React.FC<RadioInputProps> = ({ name, value, checked, children, onChange, widthClass = 'w-full', heightClass, backgroundImageUrl }) => {
    const backgroundStyle = backgroundImageUrl
        ? { backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : {};

    return (
        <label
            className={`relative rounded-lg shadow-md p-4 flex sm:inline-flex items-center justify-center cursor-pointer transition-colors ${backgroundImageUrl ? 'm-4': 'm-0'} duration-300 mx-2 object-cover ${widthClass} ${heightClass} ${checked ? 'bg-unno_sc-950' : 'bg-white hover:bg-dark_ud-100'}`}
            style={backgroundStyle}
        >
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="sr-only"
                required
            />
            {!backgroundImageUrl && <span className={`text-gray-900 font-nsans text-center z-10 ${checked ? 'text-white font-bold' : ''}`}>{children}</span>}
            {backgroundImageUrl && (
                <>
                    <div className={`absolute inset-0 ${checked ? 'bg-unno_sc-600 opacity-60' : ''} rounded-lg transition-opacity duration-300`}></div>
                    <span className={`absolute inset-0 flex items-center justify-center shadow-md text-white rounded-lg font-bold font-nsans text-center z-10 ${checked || 'opacity-0 hover:opacity-100 hover:bg-unno_sc-950'} transition-opacity duration-300`}>
                        {children}
                    </span>
                </>
            )}
        </label>
    );
};

export default RadioInput;

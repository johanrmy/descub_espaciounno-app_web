import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    bg?: string;
    hoverBgClass?: string;
    color?: boolean;
    type?: "submit" | "reset" | "button";
    iconBtn?: React.ReactNode;
    iconButtonClass?: string
    disabled?: boolean
    name?: string
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children, bg = 'bg-gray-200', hoverBgClass = 'hover:bg-gray-300', color = true, type = 'button', iconBtn, iconButtonClass, disabled = false, name }) => {
    const buttonClass = classNames(
        hoverBgClass,
        bg,
        'py-1',
        'px-4',
        'rounded-lg',
        'font-base',
        {
            'text-black': color,
            'text-white': !color,
        },
        'transition-colors',
        'font-roboto',
        'font-normal',
        className
    );

    return (
        <>
            {iconBtn ? (
                <button
                    onClick={onClick}
                    className={iconButtonClass}
                    type={type}
                    name={name}
                >
                    {iconBtn}
                </button>
            ) : (
                <button
                    onClick={onClick}
                    className={buttonClass}
                    type={type}
                    disabled={disabled}
                    name={name}
                >
                    {children}
                </button>
            )}
        </>
    );
};

export default Button;

import React, { useEffect, useState } from 'react';
import Input from './Input';

interface InputBtnProps {
    type?: string;
    placeholder?: string;
    className?: string;
    nameid?: string;
    value: string;
    label?: string;
    labelName?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    validKey?: string[]
    required?: boolean;
    readonly?: boolean;
    titleBtn: string[],
    symbol?: string
    icon?: React.ReactNode
}

const InputBtn: React.FC<InputBtnProps> = ({
    type = "text",
    placeholder = "Enter text...",
    className,
    required = false,
    nameid,
    value,
    label,
    labelName,
    readonly = false,
    onChange,
    validKey,
    titleBtn,
    symbol,
    icon
}) => {
    const [changeValue, setChangeValue] = useState<string>(value);

    useEffect(() => {
        setChangeValue(value);
    }, [value]);

    const handleButtonClick = (value: string) => {
        setChangeValue(value);
        if (onChange) {
            onChange({ target: { value, name:nameid } } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeValue(e.target.value);
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <>
            {label && labelName && <label htmlFor={label} className="text-unno_pr-500 font-roboto font-normal text-base mb-3">{labelName}</label>}
            <div className='flex flex-col lg:flex-row'>
                <Input
                    className={className}
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    validKey={validKey}
                    onChange={handleChange}
                    readonly={readonly}
                    nameid={nameid}
                    value={changeValue}
                    label={label}
                    icon={icon}
                />
                <div className="flex flex-row flex-wrap items-center sm:flex-nowrap md:flex-nowrap lg:flex-nowrap xl:flex-wrap 2xl:flex-nowrap justify-around w-full p-2 lg:p-0">
                    {titleBtn.map((title) => (
                        <button 
                            type='button'
                            key={title} 
                            onClick={() => handleButtonClick(title)}
                            className="bg-unno_sc-950 hover:bg-unno_pr-200 transition-colors text-white font-bold py-2 px-6 mx-0 mb-2 rounded-xl w-auto sm:w-full md:w-full xl:w-auto 2xl:w-full sm:mx-2 lg:mb-2"
                        >
                            {title}{symbol}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default InputBtn;

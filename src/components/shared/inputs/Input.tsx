import React, { useState } from 'react';
import classNames from 'classnames';

interface InputProps {
    type?: string;
    placeholder?: string;
    className?: string;
    icon?: string | React.ReactNode;
    nameid?: string;
    value?: string;
    label?: string;
    labelName?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    validKey?: string[]
    required?: boolean;
    readonly?: boolean;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
    type = "text",
    placeholder = "Enter text...",
    icon,
    className,
    required = false,
    nameid,
    value,
    label,
    labelName,
    readonly = false,
    onChange,
    validKey
}, ref) => {
    const [isInvalid, setIsInvalid] = useState(false);

    const handleBlur = () => {
        if (required && !value) {
            setIsInvalid(true);
        } else {
            setIsInvalid(false);
        }
    };

    const handleValidKey = (e:any) =>{
        if(!validKey?.includes(e.key)){
            e.preventDefault();
        }
    }

    const containerClass = classNames(
        'relative',
        'flex',
        'items-stretch',
        'h-10'
    );

    const spanClass = classNames(
        'flex',
        'items-center',
        'whitespace-nowrap',
        'text-center',
        'border',
        'border-gray-300',
        'rounded-xl',
        'rounded-r-none',
        'border-r-0',
        'px-4',
        'h-full',
        'shadow-sm',
    );

    const inputClass = classNames(
        'block',
        'relative',
        'bg-white',
        'border',
        'border-gray-300',
        'rounded-xl',
        icon && 'rounded-l-none',
        'px-4',
        'leading-tight',
        'focus:outline-none',
        'focus:bg-white',
        'focus:border-gray-400',
        'font-nsans',
        'font-light',
        'text-base',
        'shadow-sm',
        'w-full',
        'transition',
        'content-center',
        className,
        isInvalid && 'border-red-500'
    );

    const iconClass = classNames(
        'w-6',
        'h-6',
        'border-none'
    );

    return (
        <>
            {label && labelName && <label htmlFor={label} className="text-unno_pr-500 font-roboto font-normal text-base mb-3">{labelName}</label>}
            <div className={containerClass}>
                {icon && typeof icon === 'string' && (
                    <label htmlFor={nameid}>
                        <span className={spanClass}>
                            <img src={icon} alt="" className={iconClass} />
                        </span>
                    </label>
                )}
                {icon && typeof icon === 'object' && (
                    <label htmlFor={nameid}>
                        <span className={spanClass}>
                            {icon}
                        </span>
                    </label>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    className={inputClass}
                    required={required}
                    name={nameid}
                    id={nameid}
                    value={value}
                    onChange={onChange}
                    ref={ref}
                    readOnly={readonly}
                    max={type === "date" ? new Date().toISOString().split("T")[0] : undefined}
                    onBlur={handleBlur}
                    onKeyDown={validKey ? handleValidKey : ()=>{}}
                />
            </div>
        </>
    );
};

export default React.forwardRef(Input);

import React, { useState } from 'react';
import classNames from 'classnames';
import { CiImageOn } from "react-icons/ci";

interface InputFileProps {
    className?: string;
    nameid?: string;
    value?: string;
    label?: string;
    labelName?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    readonly?: boolean;
}

const InputFile: React.ForwardRefRenderFunction<HTMLInputElement, InputFileProps> = ({className, required = false , nameid, value, label, labelName, readonly = false, onChange}) => {
    const [fileName, setFileName] = useState<string | undefined>(undefined);

    const inputClass = classNames(
        'block',
        'relative',
        'bg-white',
        'border',
        'border-gray-300',
        'rounded-xl',
        'rounded-l-none',
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
        'cursor-pointer',
        className
    );

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : undefined;
        if (file) {
            setFileName(file.name);
        } else {
            setFileName(undefined);
        }

        if (onChange) {
            onChange(event);
        }
    };

    return (
        <>
            {label && labelName &&
                <div className='flex flex-row'>
                    <label htmlFor={label} className="text-unno_pr-500 font-roboto font-normal text-base inline-block mb-3">{labelName}</label>
                </div> 
            }
            <div className='relative flex items-stretch h-10 mb-6'>
                <label htmlFor={nameid}>
                    <span className='flex whitespace-nowrap items-center text-center border border-gray-300 rounded-xl rounded-r-none border-r-0 h-full px-4 shadow-sm cursor-pointer'>
                        <CiImageOn className='h-6 w-6 text-dark_ud-800'/>
                    </span>
                </label>
                <div className={inputClass}>
                    <input
                        type='file'
                        className='w-full h-full absolute inset-0 content-center opacity-0'
                        required={required}
                        name={nameid}
                        id={nameid}
                        value={value}
                        onChange={handleFileChange}
                        readOnly={readonly}
                        accept="image/png, image/jpeg, image/jpg"
                    />
                    {fileName ? (
                        <span className='text-dark_ud-500'>{fileName}</span>
                    ) : (
                        <span className='text-dark_ud-500'>Buscar archivos...</span>
                    )}
                </div>
            </div>
        </>
    );
};

export default InputFile;

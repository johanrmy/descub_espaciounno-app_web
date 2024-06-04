import React, { useEffect, useState } from 'react';

interface TextAreaProps {
    label?: string;
    labelName?: string;
    defaultContent?: string;
    maxLength?: number;
    heightTw?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CharacterCounterTextarea: React.FC<TextAreaProps> = ({label, labelName, defaultContent = '', maxLength = 120, heightTw = 'h-28', onChange}) => {
    const [text, setText] = useState<string>(defaultContent);

    useEffect(() => {
        setText(defaultContent)
    }, [defaultContent])

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value;
        if (newText.length <= maxLength) {
            setText(newText);
            if (onChange) {
                onChange(event);
            }
        }
    };

    return (
        <>
            {label && labelName && <label htmlFor={label} className="text-unno_pr-500 font-roboto font-normal text-base inline-block mb-3">{labelName}</label>}
            <div className={`flex flex-col font-nsans ${heightTw}`}>
            <textarea
                value={text}
                id={label}
                name={label}
                onChange={handleChange}
                rows={4}
                cols={7}
                required={true}
                className='w-full h-full border border-gray-300 rounded-xl shadow-sm px-4 py-2 resize-none transition outline-none focus:border-gray-400 focus:bg-white'
            />
            <span className='text-end'>
                {text.length}/{maxLength}
            </span>
        </div>
        </>
    );
};

export default CharacterCounterTextarea;

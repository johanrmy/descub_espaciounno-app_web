import React from 'react';

interface TableBodyProps {
    children?: React.ReactNode
}

const TableBody: React.FC<TableBodyProps> = ({children}) => {

    return (
        <tbody className='text-dark_ud-800 font-nsans font-light text-base'>
            {children}
        </tbody>
    );
};

export default TableBody;

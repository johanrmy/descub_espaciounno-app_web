import React from 'react';

interface TableProps {
    children?: React.ReactNode;
}

const Table: React.FC<TableProps> = ({children}) => {

    return (
        <table className='table-auto border-collapse border-spacing-0 mb-0 whitespace-nowrap'>
            {children}
        </table>
    );
};

export default Table;

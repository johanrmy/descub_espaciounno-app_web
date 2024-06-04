import classNames from 'classnames';
import React from 'react';

interface TableRowItemProps {
    children?: React.ReactNode
    className?: string
}

const TableRowItem: React.FC<TableRowItemProps> = ({children, className}) => {

    const trClass = classNames(
        'border-b',
        'border-dark_ud-200',
        'hover:bg-dark_ud-100',
        className
    )

    return (
        <tr className={trClass}>
            {children}
        </tr>
    );
};

export default TableRowItem;

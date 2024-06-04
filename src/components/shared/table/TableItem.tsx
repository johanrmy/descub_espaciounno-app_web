import classNames from 'classnames';
import React from 'react';

interface TableItemProps {
    children?: React.ReactNode
    className?: string
}

const TableItem: React.FC<TableItemProps> = ({children, className}) => {

    const tdClass = classNames(
        'px-6',
        'py-3',
        className
    )

    return (
        <td className={tdClass}>{children}</td>
    );
};

export default TableItem;

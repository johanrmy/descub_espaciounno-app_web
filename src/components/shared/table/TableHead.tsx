import React from 'react';
import classNames from 'classnames';

interface TableHeadProps {
    children?: React.ReactNode
}

const TableHead: React.FC<TableHeadProps> = ({children}) => {

    return (
        <thead className='border-b-2 border-unno_pr-500 text-unno_pr-500 font-roboto'>
            <tr className='text-left'>
            {React.Children.map(children, (child, index) => {
                let className = classNames(
                'px-6 py-3 bg-dark_ud-100',
                {
                'rounded-tl-2xl': index === 0,
                'rounded-tr-2xl': index === React.Children.count(children) - 1
                }
                );
                return React.cloneElement(child as React.ReactElement, { className });
                })}
            </tr>
        </thead>
    );
};

export default TableHead;

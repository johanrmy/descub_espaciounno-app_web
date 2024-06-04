import React from 'react';
import TableItem from '../table/TableItem';
import { IoEyeSharp } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { Link } from 'react-router-dom';
import DeleteButton from '../buttons/DeleteButton';

interface ActionItemsProps {
    children?: React.ReactNode,
    nameAction: string,
    activateDelete?: boolean,
    activateUpdate?: boolean,
    activateRead?: boolean,
    baseUrl: string,
    onDelete?: () => void,
}

const ActionItems: React.FC<ActionItemsProps> = ({ nameAction, activateDelete = true, activateRead = true, activateUpdate = true, baseUrl, onDelete = () => {} }) => {
    return (
        <TableItem className='flex space-x-4'>
            {activateRead && <Link to={`read/${nameAction}`} className='rounded-full bg-unno_pr-500 text-white p-1'><IoEyeSharp /></Link>}
            {activateUpdate && <Link to={`update/${nameAction}`} className='rounded-full bg-unno_pr-500 text-white p-1'><GrUpdate /></Link>}
            {activateDelete && <DeleteButton id={nameAction} baseUrl={baseUrl} onDelete={onDelete} />}
        </TableItem>
    );
};

export default ActionItems;

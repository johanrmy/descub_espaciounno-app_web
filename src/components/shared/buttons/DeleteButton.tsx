import React from 'react';
import { confirmDelete } from '@handlers/confirmHandler';
import { MdDeleteForever } from 'react-icons/md';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

interface DeleteButtonProps {
    baseUrl: string;
    id: string;
    onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ baseUrl, id, onDelete }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        confirmDelete({ baseUrl, id, onSuccess: onDelete, navigate });
    };

    return (
        <Button iconBtn={<MdDeleteForever />} iconButtonClass='rounded-full bg-unno_pr-500 text-white p-1' onClick={handleDelete}/>
    );
};

export default DeleteButton;

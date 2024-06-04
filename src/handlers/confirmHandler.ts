import Swal from 'sweetalert2';
import { deleteRecord } from './deleteHandler';
import { NavigateFunction } from 'react-router-dom';

interface ConfirmDeleteProps {
    baseUrl: string;
    id: string;
    onSuccess: () => void;
    navigate: NavigateFunction;
}

export const confirmDelete = ({ baseUrl, id, onSuccess, navigate }: ConfirmDeleteProps): void => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#004A40',
        confirmButtonText: 'Sí, hazlo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteRecord({ baseUrl, id, onSuccess, navigate });
        }
    });
};


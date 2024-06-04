import Swal from 'sweetalert2';
import { deleteRecordReq } from '@data/requestAPI';
import { NavigateFunction } from 'react-router-dom';

interface DeleteRecordProps {
    baseUrl: string;
    id: string;
    onSuccess: () => void;
    navigate: NavigateFunction;
}

export const deleteRecord = async ({ baseUrl, id, onSuccess, navigate }: DeleteRecordProps): Promise<void> => {
    try {
        Swal.fire({
            title: 'Cargando...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await deleteRecordReq(id, baseUrl);
        if (response.success) {
            Swal.fire({
                title: '¡Eliminado!',
                text: response.message,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#004A40',
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(0);
                }
            });
            onSuccess();
        } else {
            Swal.fire('¡Error!', response.message, 'error');
        }
    } catch (error) {
        Swal.fire('¡Error!', 'Hubo un problema al eliminar el registro.', 'error');
    }
};

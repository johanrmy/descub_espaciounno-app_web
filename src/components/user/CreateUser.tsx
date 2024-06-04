import Card from '@components/shared/cards/Card';
import Layout from '@components/shared/Layout';
import { useCreateUser } from '@data/hooks/useFetchUsers';
import { initialUserData } from '@data/initial/initials';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FirstGroupFields from './sections/FirstFromField';
import SecondGroupFields from './sections/SecondFromField';

const CreateUser: React.FC = () => {
    const navigate = useNavigate();
    const { handleCreateUser, statusCreateUser} = useCreateUser();
    const [userData, setUserData] = useState<UserRequestEntry>(initialUserData);
    const [hasSubmitted, SetHasSubmitted] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    useEffect(() => {
        setUserData(initialUserData)
    }, [initialUserData]);

    useEffect(() => {
        if (hasSubmitted) {
            Swal.fire({
                title: statusCreateUser.success ? '¡Registro exitoso!' : '¡Error!',
                icon: statusCreateUser.success ? 'success' : 'error',
                text: statusCreateUser.success ? 'El registro ha sido creado correctamente.' : 'Hubo un problema al generar el registro. Por favor, inténtalo de nuevo más tarde.',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: '#004A40',
            }).then((result) => {
                if (result.isConfirmed && statusCreateUser.success) {
                    navigate(`/usuarios`);
                }
                SetHasSubmitted(false);
            });
        }
    }, [hasSubmitted, statusCreateUser, navigate]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        const file = event.target.files ? event.target.files[0] : null;
        setUserData({
            ...userData,
            [name]: file,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userData.password !== userData.confirm_password) {
            setShowAlert(true)
            setMessageAlert('Las contraseñas no coinciden')
            return;
        } else if (userData.password.length <= 8) {
            setShowAlert(true)
            setMessageAlert('La constraseña debe ser mayor a 8 caracteres')
            return;
        } else{
            Swal.fire({
                title: 'Cargando...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
    
            const formData = new FormData();
            if (userData.file_a) {
                formData.append('file_a', userData.file_a);
            }
            formData.append('first_name', userData.first_name);
            formData.append('last_name', userData.last_name);
            formData.append('email', userData.email.toLocaleLowerCase());
            formData.append('is_admin', userData.is_admin.toString());
            formData.append('is_superadmin', userData.is_superadmin.toString());
            formData.append('password', userData.password);
    
            await handleCreateUser(formData);
    
            SetHasSubmitted(true);
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
        setMessageAlert('')
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-unno_pr-500 font-roboto">Crear Usuario</h1>
            <Card loading={false} error={null} className='w-[100%] lg:w-[75%] mx-auto border-2'>
                <form action='PUT' onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-rows-1 grid-cols-1 xl:grid-cols-2 gap-6 ">
                        <FirstGroupFields userData={userData} handleInputChange={handleInputChange} handleCloseAlert={handleCloseAlert} infoAlert={{showAlert, messageAlert}}/>
                        <SecondGroupFields userData={userData} handleFileChange={handleFileChange} handleInputChange={handleInputChange}/>
                    </div>
                </form>
            </Card>
        </Layout>
    );
};

export default CreateUser;

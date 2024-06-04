import Card from '@components/shared/cards/Card';
import Layout from '@components/shared/Layout';
import { useFetchUserById, useUpdateUserById } from '@data/hooks/useFetchUsers';
import { initialUserData } from '@data/initial/initials';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FirstGroupFields from './sections/FirstFromField';
import SecondGroupFields from './sections/SecondFromField';

const UpdateUser: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, loading, error } = useFetchUserById(id || '');
    const { handleUpdateUser, statusUpdateUser } = useUpdateUserById();
    const [userData, setUserData] = useState<UserRequestEntry>(initialUserData);
    const [hasSubmitted, SetHasSubmitted] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    useEffect(() => {
        if (user) {
            setUserData({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                is_admin: user.is_admin,
                is_superadmin: user.is_superadmin,
                password: '',
                confirm_password: '',
                file_a: null,
            });
        }
    }, [user]);

    useEffect(() => {
        if (hasSubmitted) {
            Swal.fire({
                title: statusUpdateUser.success ? '¡Actualización exitosa!' : '¡Error!',
                icon: statusUpdateUser.success ? 'success' : 'error',
                text: statusUpdateUser.success ? 'El registro ha sido actualizado correctamente.' : 'Hubo un problema al actualizar el registro. Por favor, inténtalo de nuevo más tarde.',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: '#004A40',
            }).then((result) => {
                if (result.isConfirmed && statusUpdateUser.success) {
                    navigate(`/usuarios`);
                }
                SetHasSubmitted(false);
            });
        }
    }, [hasSubmitted, statusUpdateUser, navigate, user]);

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
        } else if (userData.password && userData.password.length <= 8) {
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
            
            if (userData.password) {
                formData.append('password', userData.password);
            }
    
            await handleUpdateUser(id || '', formData);
    
            SetHasSubmitted(true);
        }
        
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
        setMessageAlert('');
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-unno_pr-500 font-roboto">{`Usuario ${user?.id ? user.id : ''}`}</h1>
            <Card loading={loading} error={error} className='w-[100%] lg:w-[75%] mx-auto border-2'>
                <form action='PUT' onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-rows-1 grid-cols-1 xl:grid-cols-2 gap-6 ">
                        <FirstGroupFields userData={userData} handleInputChange={handleInputChange} handleCloseAlert={handleCloseAlert} infoAlert={{showAlert, messageAlert}} requiredPassword={false}/>
                        <SecondGroupFields userData={userData} handleFileChange={handleFileChange} handleInputChange={handleInputChange}/>
                    </div>
                </form>
            </Card>
        </Layout>
    );
};

export default UpdateUser;

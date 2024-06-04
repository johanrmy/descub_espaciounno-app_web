import Card from '@components/shared/cards/Card';
import Layout from '@components/shared/Layout';
import { initialArtistData } from '@data/initial/initials';
import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import FirstGroupFields from './sections/FirstFormField';
import SecondGroupFields from './sections/SecondFormField';
import Swal from 'sweetalert2';
import { useCreateArtist } from '@data/hooks/useFetchArtists';


const CreateArtist: React.FC = () => {
    const navigate = useNavigate();
    const [artistData, setArtistData] = useState<ArtistRequestEntry>(initialArtistData);
    const {handleCreateArtist, errorCreateArtist} = useCreateArtist();
    const [hasSubmitted, SetHasSubmitted] = useState(false)


    useEffect(() => {
        setArtistData(initialArtistData)
    }, [initialArtistData]);

    useEffect(() => {
        if (hasSubmitted) {
            Swal.fire({
                title: !errorCreateArtist ? '¡Registro exitoso!' : '¡Error!',
                icon: !errorCreateArtist  ? 'success' : 'error',
                text: !errorCreateArtist ? 'Información registrada correctamente.' : 'Hubo un problema al generar el registro. Por favor, inténtalo de nuevo más tarde.',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: '#004A40',
            }).then((result) => {
                if (result.isConfirmed  && !errorCreateArtist) {
                    navigate(`/artistas`)
                }
                SetHasSubmitted(false);
            });
        }
    }, [errorCreateArtist, hasSubmitted, navigate]);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        setArtistData({
                ...artistData,
                [name]: value,
        });
        };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        const file = event.target.files ? event.target.files[0] : null;
        setArtistData({
            ...artistData,
            [name]: file,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        Swal.fire({
            title: 'Cargando...',
            allowOutsideClick: false,
            didOpen: () => {
            Swal.showLoading();
            }
        });
        
        const formData = new FormData();
        if (artistData.file_a) {
            formData.append('file_a', artistData.file_a);
        }
        if (artistData.file_b) {
            formData.append('file_b', artistData.file_b);
        }
        if (artistData.file_c) {
            formData.append('file_c', artistData.file_c);
        }
        formData.append('name', artistData.name);
        formData.append('last_name', artistData.last_name);
        formData.append('nickname', artistData.nickname);
        formData.append('email', artistData.email);
        formData.append('user_instagram', artistData.user_instagram);
        formData.append('user_tiktok', artistData.user_tiktok);
        formData.append('user_facebook', artistData.user_facebook);
        formData.append('is_partner', artistData.is_partner.toString());
        formData.append('description', artistData.description);
        formData.append('employment', artistData.employment);

        await handleCreateArtist(formData);
        SetHasSubmitted(true)
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-unno_pr-500 font-roboto">Crear artista</h1>
            <Card loading={false} error={null}>
                <form action='POST' onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-rows-1 grid-cols-1 xl:grid-cols-2 gap-6 ">
                        <FirstGroupFields artistData={artistData} handleInputChange={handleInputChange}/>
                        <SecondGroupFields artistData={artistData} handleFileChange={handleFileChange} handleInputChange={handleInputChange}/>
                    </div>
                </form>
            </Card>
        </Layout>
    );
};

export default CreateArtist;
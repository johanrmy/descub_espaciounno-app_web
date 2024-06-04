import Card from '@components/shared/cards/Card';
import Layout from '@components/shared/Layout';
import { useFetchArtists } from '@data/hooks/useFetchArtists';
import { useFetchMurals } from '@data/hooks/useFetchMurals';
import { initialPartnershipData } from '@data/initial/initials';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ArtistSelectField from './sections/ArtistSelectField';
import MuralSelectField from './sections/MuralSelectField';
import { useCreatePartnershipById } from '@data/hooks/useFetchPartnerships';

const CreatePartnership: React.FC = () => {
    const navigate = useNavigate();
    const { artists } = useFetchArtists();
    const { murals } = useFetchMurals();
    const { handleCreatePartnership, errorCreatePartnership } = useCreatePartnershipById();

    const [partnershipData, setPartnershipData] = useState(initialPartnershipData);
    const [hasSubmitted, SetHasSubmitted] = useState(false);


    useEffect(() => {
        setPartnershipData(initialPartnershipData);
    }, [initialPartnershipData]);

    useEffect(() => {
        if (hasSubmitted) {
            Swal.fire({
                title: errorCreatePartnership.success && errorCreatePartnership.message !== null ? '¡Creación exitosa!' : '¡Error!',
                icon: errorCreatePartnership.success && errorCreatePartnership.message !== null ? 'success' : 'error',
                text: errorCreatePartnership.success && errorCreatePartnership.message !== null ? 'Partnership registrado correctamente.' : errorCreatePartnership.message,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: '#004A40',
            }).then((result) => {
                if (result.isConfirmed && errorCreatePartnership.success) {
                    navigate(`/partnerships`);
                }
                SetHasSubmitted(false);
            });
        }
    }, [hasSubmitted, errorCreatePartnership, navigate]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setPartnershipData({
            ...partnershipData,
            [name]: value,
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
        formData.append('artist_id', partnershipData.artist_id);
        formData.append('mural_id', partnershipData.mural_id);

        await handleCreatePartnership(formData);

        SetHasSubmitted(true);
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-unno_pr-500 font-roboto">Crear partnership</h1>
            <Card loading={false} error={null}>
                <form action='POST' onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-rows-1 grid-cols-1 xl:grid-cols-2 gap-6 ">
                        <ArtistSelectField artists={artists} handleInputChange={handleInputChange} partnershipData={partnershipData} />
                        <MuralSelectField murals={murals} handleInputChange={handleInputChange} partnershipData={partnershipData} />
                    </div>
                </form>
            </Card>
        </Layout>
    );
};

export default CreatePartnership;

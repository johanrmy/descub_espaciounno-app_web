import Card from '@components/shared/cards/Card';
import Layout from '@components/shared/Layout';
import { useFetchArtists } from '@data/hooks/useFetchArtists';
import { useFetchMurals } from '@data/hooks/useFetchMurals';
import { useFetchPartnershipById, useUpdatePartnershipById } from '@data/hooks/useFetchPartnerships';
import { initialPartnershipData } from '@data/initial/initials';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ArtistSelectField from './sections/ArtistSelectField';
import MuralSelectField from './sections/MuralSelectField';

const UpdatePartnership: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { artists } = useFetchArtists();
    const { murals } = useFetchMurals();
    const { partnership, error, loading } = useFetchPartnershipById(id || '');
    const { handleUpdatePartnership, errorUpdatePartnership } = useUpdatePartnershipById();

    const [partnershipData, setPartnershipData] = useState(initialPartnershipData);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (partnership) {
            setPartnershipData({
                artist_id: partnership.artist.id,
                mural_id: partnership.mural.id,
            });
        }
    }, [partnership]);

    useEffect(() => {
        if (hasSubmitted) {
            Swal.fire({
                title: errorUpdatePartnership.success ? '¡Actualización exitosa!' : '¡Error!',
                icon: errorUpdatePartnership.success ? 'success' : 'error',
                text: errorUpdatePartnership.message,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: '#004A40',
            }).then((result) => {
                if (result.isConfirmed && errorUpdatePartnership.success) {
                    navigate(`/partnerships`);
                }
                setHasSubmitted(false);
            });
        }
    }, [errorUpdatePartnership, hasSubmitted, navigate]);

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
            },
        });

        const formData = new FormData();
        formData.append('artist_id', partnershipData.artist_id);
        formData.append('mural_id', partnershipData.mural_id);

        await handleUpdatePartnership(id || '', formData);
        setHasSubmitted(true);
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-unno_pr-500 font-roboto">{`Partnership ${partnership?.id ? partnership.id : ''}`}</h1>
            <Card loading={loading} error={error}>
                <form action='PUT' onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-rows-1 grid-cols-1 xl:grid-cols-2 gap-6 ">
                        <ArtistSelectField artists={artists} handleInputChange={handleInputChange} partnershipData={partnershipData} />
                        <MuralSelectField murals={murals} handleInputChange={handleInputChange} partnershipData={partnershipData} />
                    </div>
                </form>
            </Card>
        </Layout>
    );
};

export default UpdatePartnership;

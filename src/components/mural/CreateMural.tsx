import Card from '@components/shared/cards/Card';
import Layout from '@components/shared/Layout';
import { initialClickedStoreCoords, initialCreateMuralData } from '@data/initial/initials';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FirstGroupFields from './sections/FirstFormField';
import SecondGroupFields from './sections/SecondFormField';
import Swal from 'sweetalert2';
import { useCreateMural } from '@data/hooks/useFetchMurals';

const CreateMural: React.FC = () => {
    const navigate = useNavigate();
    const [muralData, setMuralData] = useState<MuralCreateRequestEntry>(initialCreateMuralData);
    const [clickedCoords, setClickedCoords] = useState<marker>(initialClickedStoreCoords);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { handleCreateMural, errorCreateMural } = useCreateMural();

    useEffect(() => {
        setMuralData(initialCreateMuralData);
        setClickedCoords(initialClickedStoreCoords);
    }, []);

    useEffect(() => {
        if (hasSubmitted) {
            if (errorCreateMural !== undefined) {
                Swal.fire({
                    title: !errorCreateMural ? '¡Registro exitoso!' : '¡Error!',
                    icon: !errorCreateMural ? 'success' : 'error',
                    text: !errorCreateMural ? 'El registro ha sido creado correctamente.' : 'Hubo un problema al generar el registro. Por favor, inténtalo de nuevo más tarde.',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: '#004A40',
                }).then((result) => {
                    if (result.isConfirmed && !errorCreateMural) {
                        navigate(`/murales`);
                    }
                    setHasSubmitted(false);
                });
            }
        }
    }, [errorCreateMural, hasSubmitted, navigate]);

    const handleNewMarkerCoords = (coords: marker) => {
        setClickedCoords(coords);
        setMuralData({
            ...muralData,
            mural: {
                ...muralData.mural,
                lat: coords.lat,
                lng: coords.lng,
            },
        });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name.startsWith("address.")) {
            const addressField = name.split(".")[1];
            setMuralData({
                ...muralData,
                address: {
                    ...muralData.address,
                    [addressField]: value,
                },
            });
        } else {
            setMuralData({
                ...muralData,
                mural: {
                    ...muralData.mural,
                    [name]: value,
                },
            });
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        const file = event.target.files ? event.target.files[0] : null;
        setMuralData({
            ...muralData,
            mural: {
                ...muralData.mural,
                [name]: file,
            },
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
        if (muralData.mural.file_a) {
            formData.append('file_a', muralData.mural.file_a);
        }
        if (muralData.mural.file_b) {
            formData.append('file_b', muralData.mural.file_b);
        }
        if (muralData.mural.file_c) {
            formData.append('file_c', muralData.mural.file_c);
        }
        formData.append('name', muralData.mural.name);
        formData.append('creation_date', muralData.mural.creation_date);
        formData.append('description', muralData.mural.description);
        formData.append('lat', muralData.mural.lat.toString());
        formData.append('lng', muralData.mural.lng.toString());
        formData.append('street', muralData.address.name);
        formData.append('district_id', muralData.address.district_id);

        await handleCreateMural(formData);
        setHasSubmitted(true);
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-unno_pr-500 font-roboto">Crear mural</h1>
            <Card loading={false} error={null}>
                <form action='POST' onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-rows-1 grid-cols-1 xl:grid-cols-2 gap-6">
                        <FirstGroupFields clickedCoords={clickedCoords} handleInputChange={handleInputChange} handleNewMarkerCoords={handleNewMarkerCoords} muralData={muralData} />
                        <SecondGroupFields handleInputChange={handleInputChange} handleFileChange={handleFileChange} muralData={muralData} />
                    </div>
                    <button type="submit" className="btn btn-primary">Crear</button>
                </form>
            </Card>
        </Layout>
    );
};

export default CreateMural;

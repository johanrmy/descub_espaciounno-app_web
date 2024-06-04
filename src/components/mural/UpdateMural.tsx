import Card from '@components/shared/cards/Card';
import Layout from '@components/shared/Layout';
import { useUpdateAddressById } from '@data/hooks/useFetchLocation';
import { useFetchMuralById, useUpdateMuralById } from '@data/hooks/useFetchMurals';
import { initialClickedCoords, initialMuralData } from '@data/initial/initials';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FirstGroupFields from './sections/FirstFormField';
import SecondGroupFields from './sections/SecondFormField';
import Swal from 'sweetalert2';

const UpdateMural: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { mural, loading, error } = useFetchMuralById(id || '');
    const { handleUpdateMural, errorUpdateMural } = useUpdateMuralById();
    const { updateAddress, errorUpdateAddress } = useUpdateAddressById();

    const [muralData, setMuralData] = useState<MuralRequestEntry>(initialMuralData);
    const [clickedCoords, setClickedCoords] = useState<marker>(initialClickedCoords);
    const [hasSubmitted, SetHasSubmitted] = useState(false);

    useEffect(() => {
        if (mural) {
            setMuralData({
                mural: {
                    name: mural.name,
                    creation_date: mural.creation_date,
                    description: mural.description,
                    lat: mural.location.coordinates[1],
                    lng: mural.location.coordinates[0],
                    file_a: null,
                    file_b: null,
                    file_c: null
                },
                address: {
                    name: mural.address.name,
                    district_id: mural.address.district.id
                }
            });
            setClickedCoords({ lat: mural.location.coordinates[1], lng: mural.location.coordinates[0] });
        }
    }, [mural]);

    useEffect(() => {
        if (hasSubmitted) {
            Swal.fire({
                title: !errorUpdateMural && !errorUpdateAddress ? '¡Actualización exitosa!' : '¡Error!',
                icon: !errorUpdateMural && !errorUpdateAddress ? 'success' : 'error',
                text: !errorUpdateMural && !errorUpdateAddress ? 'El registro ha sido actualizado correctamente.' : 'Hubo un problema al actualizar el registro. Por favor, inténtalo de nuevo más tarde.',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: '#004A40',
            }).then((result) => {
                if (result.isConfirmed && !errorUpdateMural && !errorUpdateAddress) {
                    navigate(`/murales/read/${mural?.id}`);
                }
                SetHasSubmitted(false);
            });
        }
    }, [hasSubmitted, errorUpdateMural, errorUpdateAddress, navigate, mural]);

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
            }
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

        await handleUpdateMural(id || '', formData);
        await updateAddress(id || '', muralData.address);

        SetHasSubmitted(true);
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-unno_pr-500 font-roboto">{`Mural ${mural?.id ? mural.id : ''}`}</h1>
            <Card loading={loading} error={error}>
                <form action='PUT' onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-rows-1 grid-cols-1 xl:grid-cols-2 gap-6 ">
                        <FirstGroupFields clickedCoords={clickedCoords} handleInputChange={handleInputChange} handleNewMarkerCoords={handleNewMarkerCoords} mural={mural} muralData={muralData} />
                        <SecondGroupFields handleInputChange={handleInputChange} handleFileChange={handleFileChange} mural={mural} muralData={muralData} />
                    </div>
                    <button type="submit" className="btn btn-primary">Actualizar</button>
                </form>
            </Card>
        </Layout>
    );
};

export default UpdateMural;

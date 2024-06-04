import Card from '@components/shared/cards/Card';
import Layout from '@components/shared/Layout';
import { initialCouponGenerateData } from '@data/initial/initials';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useFetchCouponGenerateById, useUpdateCouponGenerateById } from '@data/hooks/useFetchCoupon';
import FirstGroupFields from './sections/FirstFromField';
import SecondGroupFields from './sections/SecondFromField';

const UpdateCouponGenerate: React.FC = () => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const {couponGenerate, error, loading, coupons} = useFetchCouponGenerateById(id || '')
    const {handleUpdateCouponGenerate, statusUpdateCouponGenerate} = useUpdateCouponGenerateById()

    const [couponGenerateData, setCouponGenerateData] = useState<CouponGenerateRequestEntry>(initialCouponGenerateData);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [warning,setWarning] = useState(true);


    useEffect(() => {
        if (couponGenerate) {
            setCouponGenerateData({
                description: couponGenerate.description,
                discount: 10,
                status: couponGenerate.status,
                valid_from: new Date(couponGenerate.valid_from).toISOString().split('T')[0],
                valid_until: new Date(couponGenerate.valid_until).toISOString().split('T')[0],
                amount: coupons.length
            });
        }
    }, [couponGenerate]);

    useEffect(() => {
        if(warning){
                Swal.fire({
                    title: 'Advertencia de Actualización',
                    icon: 'warning',
                    text: 'Actualizar el paquete implica modificar los datos asociados a los cupones.',
                    confirmButtonText: 'Estoy de acuerdo',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: '#004A40',
                }).then((result)  => {
                    if (result.isConfirmed) {
                        setWarning(false);
                    }
                })
        }
        if (hasSubmitted) {
            Swal.fire({
                title: statusUpdateCouponGenerate.success && statusUpdateCouponGenerate.message !== null ? '¡Creación exitosa!' : '¡Error!',
                icon: statusUpdateCouponGenerate.success && statusUpdateCouponGenerate.message !== null ? 'success' : 'error',
                text: statusUpdateCouponGenerate.success && statusUpdateCouponGenerate.message !== null ? `Cupones actualizados` : statusUpdateCouponGenerate.message,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: '#004A40',
            }).then((result) => {
                if (result.isConfirmed && statusUpdateCouponGenerate.success) {
                    navigate(`/paquetes`);
                }
                setHasSubmitted(false);
            });
        }
    }, [hasSubmitted, statusUpdateCouponGenerate, warning, navigate]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setCouponGenerateData({
            ...couponGenerateData,
            [name]: value,
        });
    };

    const handleDateChange = (start: string, end: string) => {
        setCouponGenerateData({
            ...couponGenerateData,
            valid_from: start,
            valid_until: end,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        Swal.fire({
            title: '¿Estás seguro?',
            icon: 'warning',
            text: 'Actualizar el paquete implica modificar los datos asociados a los cupones.',
            showCancelButton: true,
            confirmButtonColor: '#004A40',
            confirmButtonText: 'Sí, hazlo',
            cancelButtonText: 'Cancelar'
        }).then(async (result)  => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Cargando...',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const formData = new FormData();
                formData.append('valid_from', couponGenerateData.valid_from);
                formData.append('valid_until', couponGenerateData.valid_until);
                formData.append('status', String(couponGenerateData.status));
                formData.append('description', couponGenerateData.description);
                formData.append('discount', String(couponGenerateData.discount/100));
        
                await handleUpdateCouponGenerate(id || '',formData);
                setHasSubmitted(true);
            }
        });
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Crear cupones</h1>
            <Card loading={loading} error={error}>
                <form action='POST' onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-rows-1 grid-cols-1 xl:grid-cols-2 gap-6 ">
                        <FirstGroupFields couponGenerateData={couponGenerateData} handleInputChange={handleInputChange} AmountInputReadonly={true}/>
                        <SecondGroupFields couponGenerateData={couponGenerateData} handleInputChange={handleInputChange} handleDateChange={handleDateChange} />
                    </div>
                </form>
            </Card>
        </Layout>
    );
};

export default UpdateCouponGenerate;

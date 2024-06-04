import Card from '@components/shared/cards/Card';
import Layout from '@components/shared/Layout';
import { initialCouponGenerateData } from '@data/initial/initials';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCreateCouponGenerate } from '@data/hooks/useFetchCoupon';
import FirstGroupFields from './sections/FirstFromField';
import SecondGroupFields from './sections/SecondFromField';

const CreateCoupon: React.FC = () => {
    const navigate = useNavigate();
    const {handleCreateCouponGenerate, statusCreateCouponGenerate} = useCreateCouponGenerate();

    const [couponGenerateData, setCouponGenerateData] = useState<CouponGenerateRequestEntry>(initialCouponGenerateData);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    useEffect(() => {
        setCouponGenerateData(initialCouponGenerateData);
    }, [initialCouponGenerateData]);

    useEffect(() => {
        if (hasSubmitted) {
            Swal.fire({
                title: statusCreateCouponGenerate.success && statusCreateCouponGenerate.message !== null ? '¡Creación exitosa!' : '¡Error!',
                icon: statusCreateCouponGenerate.success && statusCreateCouponGenerate.message !== null ? 'success' : 'error',
                text: statusCreateCouponGenerate.success && statusCreateCouponGenerate.message !== null ? `${statusCreateCouponGenerate.couponCount} cupon(es) creados` : statusCreateCouponGenerate.message,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                if (result.isConfirmed && statusCreateCouponGenerate.success) {
                    navigate(`/paquetes`);
                }
                setHasSubmitted(false);
            });
        }
    }, [hasSubmitted, statusCreateCouponGenerate, navigate]);

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
            title: 'Cargando...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const formData = new FormData();
        formData.append('valid_from', couponGenerateData.valid_from);
        formData.append('valid_until', couponGenerateData.valid_until);
        formData.append('amount', String(couponGenerateData.amount));
        formData.append('status', String(couponGenerateData.status));
        formData.append('description', couponGenerateData.description);
        formData.append('discount', String(couponGenerateData.discount/100));

        await handleCreateCouponGenerate(formData);

        setHasSubmitted(true);
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Crear cupones</h1>
            <Card loading={false} error={null}>
                <form action='POST' onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-rows-1 grid-cols-1 xl:grid-cols-2 gap-6 ">
                        <FirstGroupFields couponGenerateData={couponGenerateData} handleInputChange={handleInputChange}/>
                        <SecondGroupFields couponGenerateData={couponGenerateData} handleInputChange={handleInputChange} handleDateChange={handleDateChange} />
                    </div>
                </form>
            </Card>
        </Layout>
    );
};

export default CreateCoupon;

import Card from '@components/shared/cards/Card';
import Layout from '@components/shared/Layout';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchCouponById } from '@data/hooks/useFetchCoupon';

const UpdateCoupon: React.FC = () => {

    const { id } = useParams();
    const {coupon, error, loading} = useFetchCouponById(id || '')
    

    return (
        <Layout>
            <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
                <h1 className="text-2xl font-bold inline-block text-unno_pr-500 font-roboto">Cupón {coupon?.id}</h1>
            </div>
            <Card loading={loading} error={error} className='w-[100%] lg:w-[70%] xl:w-[50%] mx-auto border-2'>
                <div className='flex flex-col justify-center items-center text-center'>
                    <h2 className='italic'>Cupón <span className='font-bold'>{coupon?.id}</span></h2>
                    <div className='flex flex-col px-2 py-4 justify-center font-nsans'>
                        <div className='flex flex-col items-center justify-center mb-4'>
                            <h3 className='font-bold'>Generado el</h3>
                            <p>{new Date(coupon?.create_datetime as string).toLocaleString()}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center mb-4'>
                            <h3 className='font-bold'>Descuento</h3>
                            <p>{coupon?.discount}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center mb-4'>
                            <h3 className='font-bold'>Estado de paquete</h3>
                            <p className={`font-bold ${coupon?.status? 'text-green-500' : 'text-red-500'}`}>{coupon?.status ? 'Active' : 'Low'}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center mb-4'>
                            <h3 className='font-bold'>Actualizado el</h3>
                            <p>{new Date(coupon?.update_datetime as string).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </Card>
        </Layout>
    );
};

export default UpdateCoupon;

import Card from '@components/shared/cards/Card';
import Layout from '@components/shared/Layout';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchCouponGenerateById } from '@data/hooks/useFetchCoupon';
import Button from '@components/shared/buttons/Button';

const ReadCouponGenerate: React.FC = () => {

    const { id } = useParams();
    const {couponGenerate, coupons, error, loading} = useFetchCouponGenerateById(id || '')
    

    return (
        <Layout>
            <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
                <h1 className="text-2xl font-bold inline-block text-unno_pr-500 font-roboto">Paquete {couponGenerate?.id}</h1>
                <div className="flex items-center sm:flex-row flex-col-reverse">
                    <Link to={`/cupones/gc/${couponGenerate?.id}`} className='w-full sm:w-auto sm:my-0 my-2'>
                        <Button bg='bg-descub_sc-500' hoverBgClass='hover:bg-descub_sc-600' color={false} className='sm:mr-10 py-2 w-full sm:w-auto'><span className='mx-5'>Gestionar cupones</span></Button>
                    </Link>
                </div>
            </div>
            <Card loading={loading} error={error} className='w-[100%] lg:w-[70%] xl:w-[50%] mx-auto border-2'>
                <div className='flex flex-col justify-center items-center text-center'>
                    <h2 className='italic'>Paquete de cupones <span className='font-bold'>{couponGenerate?.id}</span></h2>
                    <div className='flex flex-col px-2 py-4 justify-center font-nsans'>
                        <div className='flex flex-col items-center justify-center mb-4'>
                            <h3 className='font-bold'>Generado el</h3>
                            <p>{new Date(couponGenerate?.create_datetime as string).toLocaleString()}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center mb-4'>
                            <h3 className='font-bold'>Descripción</h3>
                            <p>{couponGenerate?.description}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center mb-4'>
                            <h3 className='font-bold'>Cantidad bruta</h3>
                            <p>{couponGenerate?.amount}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center mb-4'>
                            <h3 className='font-bold'>Rango de validación</h3>
                            <p>{`[${new Date(couponGenerate?.valid_from as string).toLocaleDateString()} | ${new Date(couponGenerate?.valid_until as string).toLocaleDateString()}]`}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center mb-4'>
                            <h3 className='font-bold'>Estado de paquete</h3>
                            <p className={`font-bold ${couponGenerate?.status? 'text-green-500' : 'text-red-500'}`}>{couponGenerate?.status ? 'Active' : 'Low'}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center mb-4'>
                            <h3 className='font-bold'>Actualizado el</h3>
                            <p>{new Date(couponGenerate?.update_datetime as string).toLocaleString()}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center mb-4'>
                            <h3 className='font-bold'>Cupones ({coupons.length})</h3>
                            {coupons.map((coupon, index) => (
                                <p key={index}>{coupon.id} - {coupon.discount*100}% - <span className={`font-bold ${coupon?.status? 'text-green-500' : 'text-red-500'}`}>{coupon?.status ? 'Active' : 'Low'}</span></p>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </Layout>
    );
};

export default ReadCouponGenerate;

import Card from '@components/shared/cards/Card';
import CardColor from '@components/shared/cards/CardColor';
import CarouselImg from '@components/shared/extra/Carousel';
import Layout from '@components/shared/Layout';
import Map from '@components/shared/extra/Map';
import { useFetchMuralById } from '@data/hooks/useFetchMurals';
import React from 'react';
import { useParams } from 'react-router-dom';

const ReadMural: React.FC = () => {

    const { id } = useParams();
    const { mural, loading, error } = useFetchMuralById(id || '');
    
    const urlImgs = [mural?.url_photo_1 as string, mural?.url_photo_2 as string, mural?.url_photo_3 as string];
    const locationData: marker[] = [{lat: mural?.location.coordinates[1] as number, lng: mural?.location.coordinates[0] as number}]

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-unno_pr-500 font-roboto">{`Mural ${mural?.id ? mural.id : ''}`}</h1>
            <Card loading={loading} error={error}>
                <div className="grid grid-rows-1 grid-cols-1 xl:grid-cols-2 gap-6 ">
                    <div className='mx-auto'>
                        <CarouselImg urlImgs={urlImgs}/>
                        <div className="flex  flex-row justify-around">
                            {mural?.colors.map((color, index) => (
                                <CardColor key={index} color={color}/>
                            ))}
                        </div>
                        <span className='text-end block text-dark_ud-500 font-nsans mt-4'>Registro creado el {new Date(mural?.create_datetime as string).toLocaleString()}</span>
                    </div>
                    <div className='flex flex-col justify-start'>
                        <div className="my-5 font-roboto font-bold text-4xl text-center xl:text-start">{mural?.name}</div>
                        <div className="mb-4 font-nsans text-lg px-0 md:px-8 xl:px-0"> 
                            <p className='text-justify xl:pr-20 mb-4'>{mural?.description}</p>
                            <p><span className='font-bold'>Dirección: </span>{mural?.address.name}, {mural?.address.district.name}, {mural?.address.district.city.name}</p>
                        </div>
                        <div className='font-nsans mt-8'>
                            <p className='italic text-dark_ud-500 text-center xl:pr-20 mb-4'>{mural?.location.coordinates[1]} {mural?.location.coordinates[0]}</p>
                            <div className='rounded-md xl:pr-20'>
                                <Map 
                                    markers={locationData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Layout>
    );
};

export default ReadMural;

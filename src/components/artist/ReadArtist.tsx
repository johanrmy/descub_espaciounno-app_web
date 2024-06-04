import Card from '@components/shared/cards/Card';
import CarouselImg from '@components/shared/extra/Carousel';
import Layout from '@components/shared/Layout';
import SocialButton from '@components/shared/buttons/SocialButton';
import { useFetchArtistById } from '@data/hooks/useFetchArtists';
import { useFetchCountMuralByArtistId } from '@data/hooks/useFetchMurals';
import React from 'react';
import { useParams } from 'react-router-dom';

const ReadArtist: React.FC = () => {

    const { id } = useParams();
    const { artist, loading, error } = useFetchArtistById(id || '');
    const { count, loadingCount, errorCount } = useFetchCountMuralByArtistId(id || '');
    
    const urlImgs = [artist?.url_photo1 as string, artist?.url_photo2 as string, artist?.url_photo3 as string];

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-unno_pr-500 font-roboto">{`Artista ${artist?.id ? artist.id : ''}`}</h1>
            <Card loading={loading} error={error}>
                <div className="grid grid-rows-1 grid-cols-1 xl:grid-cols-2 gap-6 ">
                    <div className='mx-auto'>
                        <CarouselImg urlImgs={urlImgs}/>
                        <SocialButton socialMedia='instagram' username={artist?.user_instagram as string}/>
                        <SocialButton socialMedia='tiktok' username={artist?.user_tiktok as string}/>
                        <SocialButton socialMedia='facebook' username={artist?.user_facebook as string}/>
                        <span className='text-end block text-dark_ud-500 font-nsans mt-4'>Registro creado el {new Date(artist?.create_datetime as string).toLocaleString()}</span>
                    </div>
                    <div className='flex flex-col justify-start'>
                        <div className="mt-5 font-roboto font-bold text-4xl text-center xl:text-start">{artist?.nickname}</div>
                        <span className='text-center xl:text-start block text-dark_ud-500 font-nsans mb-4'>{artist?.name} {artist?.last_name}</span>
                        <div className="mb-4 font-nsans text-lg px-0 md:px-8 xl:px-0"> 
                            <p className='text-justify xl:pr-20 mb-4'>{artist?.description}</p>
                            <p><span className='font-bold'>Partner: </span><span className={`font-bold ${artist?.is_partner ? 'text-green-500' : 'text-red-500'}`}>{artist?.is_partner ? 'Yes' : 'No'}</span></p>
                            <p><span className='font-bold'>Cargos: </span>{artist?.employment}</p>
                            <p><span className='font-bold'>Contacto: </span><a href={`mailto:${artist?.email}`} className='text-blue-600 font-bold'>{artist?.email}</a></p>
                        </div>
                        <div className='font-nsans mt-8 xl:pr-20'>
                            <div className='bg-white shadow-inner border-lg flex flex-row justify-center items-center'>
                                {loadingCount && 
                                    <p>Cargando...</p>}
                                {errorCount && <p>{errorCount}</p>}
                                {!loadingCount && !errorCount && 
                                <>
                                    <img src="https://descub-espaciounno.s3.amazonaws.com/artist/store/cartoon_mural_count.png" alt="cartoon_mural_count" className='sm:w-64 sm:h-64 w-48 h-48'/>
                                    <p ><span className='text-6xl'>{count?.count}</span> murales asociados</p>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Layout>
    );
};

export default ReadArtist;

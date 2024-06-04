import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface CarouselProps {
    urlImgs: string[];
}

const CarouselImg: React.FC<CarouselProps> = ({urlImgs}) => {

    const wrapperStyles = {
        display: 'block',
    };
    
    return (
        <Carousel className='w-full h-auto mb-4 sm:max-h-96 sm:max-w-96 lg:w-96 lg:h-96 xl:w-[512px] xl:h-[512px] 2xl:max-w-full 2xl:max-h-full rounded-md hover:cursor-pointer' showThumbs={false} showArrows={true} infiniteLoop={true} showStatus={false} interval={3000} autoPlay={true} swipeable={true}>
            {urlImgs.map((url, index) => (
                <div key={index}>
                    <LazyLoadImage effect='blur' wrapperProps={{style : wrapperStyles}} alt={`muralImg${index}`} src={url} className='w-full h-auto sm:max-h-96 sm:max-w-96 lg:w-96 lg:h-96 2xl:w-[512px] 2xl:h-[512px] 2xl:max-w-full 2xl:max-h-full rounded-md'/>
                </div>
            ))}
        </Carousel>
    );
};

export default CarouselImg;

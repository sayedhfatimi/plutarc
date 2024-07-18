'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import screenshot1 from '@/public/images/screenshots/1.jpg';
import screenshot2 from '@/public/images/screenshots/2.jpg';
import screenshot3 from '@/public/images/screenshots/3.jpg';
import screenshot4 from '@/public/images/screenshots/4.png';
import screenshot5 from '@/public/images/screenshots/5.jpg';

const ScreenshotCarousel = () => {
  return (
    <Carousel
      opts={{ dragFree: true, loop: true }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {CarouselItems.map((item, index) => (
          <CarouselItem className='md:basis-1/3' key={index}>
            {item.image}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

const CarouselItems = [
  { image: <Image src={screenshot1} alt='Screenshot 1' /> },
  { image: <Image src={screenshot2} alt='Screenshot 2' /> },
  { image: <Image src={screenshot3} alt='Screenshot 3' /> },
  { image: <Image src={screenshot4} alt='Screenshot 4' /> },
  { image: <Image src={screenshot5} alt='Screenshot 5' /> },
];

export default ScreenshotCarousel;

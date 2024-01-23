import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SlideComponent from './slide';
import { Autoplay, Pagination } from 'swiper/modules';
import { CSSProperties } from 'react';
import type { Promo } from '../types/promo.type';

type BannerSliderProps = {
  promos: Promo[];
}

export default function BannerSliderComponent({ promos }: BannerSliderProps) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      slidesPerView={1}
      // className='banner'
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      speed={2000}
      pagination={{ clickable: true }}
      style={{ '--swiper-pagination-bullet-size': '16px' } as CSSProperties}
    >
      {promos.map((promo) => <SwiperSlide key={promo.id}><SlideComponent promo={promo} /></SwiperSlide>)}
    </Swiper>
  );
}

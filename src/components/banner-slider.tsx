import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SlideComponent from './slide';
import { Autoplay, Pagination } from 'swiper/modules';
import { CSSProperties } from 'react';


export default function BannerSliderComponent() {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      slidesPerView={1}
      className='banner'
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      speed={2000}
      pagination={{ clickable: true }}
      style={{ '--swiper-pagination-bullet-size': '16px' } as CSSProperties}
    >
      <SwiperSlide><SlideComponent /></SwiperSlide>
      <SwiperSlide><SlideComponent /></SwiperSlide>
      <SwiperSlide><SlideComponent /></SwiperSlide>
    </Swiper>
  );
}

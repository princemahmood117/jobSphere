
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';

import bgimg1 from '../assets/images/carousel1.jpg'
import bgimg2 from '../assets/images/carousel2.jpg'
import bgimg3 from '../assets/images/carousel3.jpg'

export default function Carousel() {
  return (
    <div className='container mx-auto px-6 py-6 lg:py-10'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >

        <SwiperSlide>
            <Slide image={bgimg1} text={'Get your web development projects done in minutes'}></Slide>
        </SwiperSlide>

        <SwiperSlide>
            <Slide image={bgimg2} text={'Get your graphics design projects done in minutes'}></Slide>
        </SwiperSlide>

        <SwiperSlide>
            <Slide image={bgimg3} text={'Start your digital marketing campaigns up n running'}></Slide>
        </SwiperSlide>
        
      </Swiper>
    </div>
  );
}

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { SwiperContainer, StyledSwiper, SwiperWrapper } from './LandingOneStyle';


import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './index.css';
import { stackimage } from '../../../images/images';

export const Landing1 = () => {
//   const onClickHandler = (e) => {
//     // 클릭시 확대
//   };
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  const stack = stackimage.map((el) => {
    return (
      <SwiperSlide className='section1-swiper-slide' key={el}>
        <div className='imgBx'>
          <img src={el} alt={el} key={el}/>
        </div>
      </SwiperSlide>
    );
  });

  return (
    <SwiperContainer>
      <div className='title-container'>
        <h1>NewDe</h1>
      </div>
      <StyledSwiper
        effect='coverflow'
        grabCursor // 마우스 커서 그랩
        autoplay={{ // 자동넘김 기능
          delay: 3500,
          disableOnInteraction: false
        }}
        slidesPerView='auto' // 한 번에 볼 수 있는 슬라이드 숫자
        loop // 무한반복
        pagination={{
          el: '.swiper-pagination', // 페이지네이션이 설정된 css 선택자나 html 요소
          // "type": 'fraction',
          clickable: true // 클릭으로 슬라이드 넘기기 가능여부
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }}
        className='section1-swiper-wrapper'
      >
        <SwiperWrapper>
          {stack}
        </SwiperWrapper>
        <div className='swiper-button-next' />
        <div className='swiper-button-prev' />
      </StyledSwiper>
        <div className='subtitle'>어떤 스택을 배워야할지 고민 되는 분들 !</div>
    </SwiperContainer>
  );
};

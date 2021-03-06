import styled from 'styled-components';
import { Swiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';

export const SwiperContainer = styled.div`
  background: linear-gradient(transparent, transparent, #F5EAE5 );
  width: 100vw;
  height: 100%;
  text-align: center;
  @media ${(props)=> props.theme.mobile}{
    width: 100%;
    height: 70%;
    
} 
  > .subtitle {
    font-size: 50px;
    color: black;
    margin: 40px 0 0 0;
    @media screen and (max-width: 400px) {
      margin: 0 0 0 0;
      font-size: 20px;
      
    }
  }
  
  > .title-container {
    margin-top: 180px;
    @media screen and (max-width: 400px) {
      margin-top: 10px;
    }
  }
  > div > h1 {
    color: black;
    font-size: 80px;
    font-weight: 200;
    line-height: 24px;
    margin-top: 30px;
    margin-bottom: 30px;
    @media screen and (max-width: 400px) {
      font-size: 50px;
      margin-bottom: 0px;
    }
  }
`;
export const StyledSwiper = styled(Swiper)`
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 80px;
  padding-bottom: 200px;
  @media ${(props)=> props.theme.mobile}{
    padding-left: 35px;
    
} 
`;

export const SwiperWrapper = styled.div`
  border: 2px solid blue;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid whitesmoke;
  height: 50rem;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 200px;
  @media ${(props)=> props.theme.mobile}{
    width: 50%;
    height: 80%;
    
} 

  > .swiper-slide {

    background-position: center;
    background-size: cover;
    width: 260px;
    height: 380px;
    background: #fff;
    padding: 0%;
    -webkit-box-reflect: below 1px linear-gradient(transparent, transparent, #0006 );
    
    }

    > .imgBx {
      width: 260px;
    height: 380px;
      overflow: hidden;
    }
    > .imgBx > img {
      width: 260px;
    height: 380px;
      object-fit: cover;
    }
`;
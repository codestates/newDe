import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router';


const SectionContainer = styled.div`
  position: relative;
  background-color: black;
  /* border: 10px solid black; */
  width: 100%;
  height: 100%;
`
const Title = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
`
const TitleText = styled.h1`
    font-family: 'Do Hyeon', sans-serif;
    font-size: 50px;
    text-align: center;
    color: white;
    text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
        0px -5px 35px rgba(255, 255, 255, 0.3);
`

const BtnWrap = styled.div`
    position: absolute;
    left: 50%;
    bottom: 25%;
    transform: translate(-50%, 25%);

    .btn {
      background-color: black;
      font-size: 24px;
      font-weight: 700;
      text-align: center;
      padding: 10px 130px;
      color: #fff;
      border: 1px solid #fff;
      &:hover {
      color: #000;
      transition: #fff 1s ease-in-out;
      background-color: #fff;
      cursor: pointer;
      }
    }
`

export const Landing3 = () => {
  const navigate = useNavigate();


    return(
      <>
        <SectionContainer>
           <Title>
               <TitleText
                 data-aos="fade-up"
                 data-aos-delay="50"
                 data-aos-duration="1300"
                 data-aos-easing="ease-out">
                 당신에게 맞는 성향을 추천해드립니다 !
                 <br />
                 지금 바로 테스트해보세요 !  
               </TitleText>
           </Title>
           <BtnWrap>
               <button
                 data-aos="fade" 
                 data-aos-delay="50"
                 data-aos-duration="1300"
                 data-aos-easing="ease-in-out"
                 onClick={() => navigate('/test')}
                 className='btn'
               >
                   테스트 하러 가기 
               </button>
           </BtnWrap>   
        </SectionContainer> 
      </>
    )
}
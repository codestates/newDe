import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Background from '../../../images/programmer.gif'


const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* border: 10px solid black; */
  width: 100%;
  height: 100%;
  @media ${(props) => props.theme.mobile}{
    width: 20%;
    
}
`
const Title = styled.h1`
    font-family: 'Do Hyeon', sans-serif;
    font-size: 50px;
    color: black;
    text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
        0px -5px 35px rgba(255, 255, 255, 0.3);
        @media ${(props) => props.theme.mobile}{
          width: 400%;
          
          font-size: 20px;
    
    
}
`

export const Landing2 = () => {
  return (
    <>
      <SectionContainer>
        <img src={Background} alt='background' />
        <Title
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="1300"
          data-aos-easing="ease-out">
          혼자서는 어려운 개발 같이 공부해봐요 !</Title>
      </SectionContainer>
    </>
  )
}
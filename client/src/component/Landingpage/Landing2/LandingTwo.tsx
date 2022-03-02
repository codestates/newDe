import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Background from '../../../images/test.jpg'

const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${Background});
  background-size: cover;
  /* border: 10px solid black; */
  width: 100%;
  height: 100%;
`
const Title = styled.h1`
    font-family: 'Do Hyeon', sans-serif;
    font-size: 50px;
    color: black;
`

export const Landing2 = () => {
    return(
      <>
        <SectionContainer>
           <Title>혼자서는 어려운 개발 같이 공부해봐요 !</Title>     
        </SectionContainer> 
      </>
    )
}
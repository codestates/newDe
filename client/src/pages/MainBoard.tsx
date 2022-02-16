//메인 게시판
import react from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


const MainContainer = styled.div`
display: flex;
position: absolute;
background : #F3F3F3;
width: 100%;
height: 100%;
text-align: center;
align-items: center;
justify-content: center;


`

const BoardWrap = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 60%;
background: brown;
@media ${(props)=> props.theme.mobile}{
    width: 100%;
    height: 100%;

}
`

function MainBoard():JSX.Element{

    
    return(
        <MainContainer>
    

        <BoardWrap>게시판 영역입니다. </BoardWrap>
        </MainContainer>
    )
        
}

export default MainBoard
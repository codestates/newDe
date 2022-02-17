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

const BoardName = styled.div`

width : 80%;
text-align: left;
background: yellow;
font-size: 1.5rem;
margin: 2%;
`

const ChildBoard = styled.div`
display: flex;
flex-direction: column;
width: 90%;
background: green;
margin-top: 1%;
align-items: center;
text-align: center;

`

const ContentWrap = styled.div`
width: 90%;
background: white;
margin: 0.5% 0.5% 0.5% 0.5% 


`


function MainBoard():JSX.Element{

    
    return(
        <MainContainer>
    

        <BoardWrap>게시판 영역입니다. 
            <BoardName>프론트 게시판</BoardName>
            <ChildBoard>
                <ContentWrap>글 1</ContentWrap>
                <ContentWrap>글 2</ContentWrap>
            </ChildBoard>

            <BoardName>백엔드 게시판</BoardName>
            <ChildBoard>
                <ContentWrap>글 1</ContentWrap>
                <ContentWrap>글 2</ContentWrap>
            </ChildBoard>



        </BoardWrap>
        </MainContainer>
    )
        
}

export default MainBoard
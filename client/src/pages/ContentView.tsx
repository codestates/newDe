//글 보기 
import react from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {Comment, WriteComment} from '../component';

const MainContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
position: absolute;
background: #F3F3F3;
width: 100%;
height: 100%;

`

const PageWrap = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 70%;
height: 100%;

background: pink;

@media ${(props)=> props.theme.mobile}{
    width: 100%;
    height: 100%;

}
`

const ContentWrap = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 90%;
height: 70%;
background: brown;
margin: 2%;
`

const TitleWrap = styled.div`
display: flex;

width: 90%;
margin : 1%;
background: grey;

`

const TitleSec = styled.div`
width: 80%;
background: red;
`

const ContentBtn = styled.button`
width: 10%;
margin: 1%;
background-color: yellow;
`
const MainContent = styled.div`
width: 90%;
height: 50%;
margin: 2%;
background: papayawhip;

`

const CommentWrap = styled.div`
width: 90%;
display: flex;
flex-direction: column;
align-items: center;
background: palevioletred;`

const WritingBox = styled.div`
width: 90%;
background: Goldenrod;

`

function ContentView ():JSX.Element {
    return (
        <MainContainer>
            <PageWrap>
                <ContentWrap>
                    <TitleWrap>
                        <TitleSec>글제목</TitleSec>
                        <ContentBtn>수정</ContentBtn>
                        <ContentBtn>삭제</ContentBtn>
                    </TitleWrap>
                    <MainContent>글 내용입니다 내용내용</MainContent>
                    
                </ContentWrap>
                <CommentWrap>
                    <Comment />
                    <Comment />
                </CommentWrap>
                <WritingBox>
                    <WriteComment />
                </WritingBox>
                
                
            </PageWrap>
            
            
        </MainContainer>
        
        

    )
    
}

export default ContentView;
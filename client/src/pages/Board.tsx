//게시판 보기 
import react from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


const MainContainer = styled.div`
display: flex;
flex-direction: column;
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
width: 80%;

@media ${(props)=> props.theme.mobile}{
    width: 100%;
    height: 100%;

}


`

const BoardName = styled.div`

width : 80%;
text-align: left;

font-size: 1.5rem;
margin: 2%;
margin-top: 5%;
`

const ChildBoard = styled.div`
display: flex;
flex-direction: column;
width: 90%;
margin-top: 1%;
align-items: center;
text-align: center;
margin-bottom: 5%;
`

const ContentWrap = styled.div`
display: flex;
justify-content: center;
width: 90%;
align-items: center;
margin: 0.5% 0.5% 0.5% 0.5%


`

const Contenttitle = styled.div`
width: 70%;
text-align: left;`


const Contentusersec = styled.div`
width: 10%;
`

const Contentlike = styled.div`
width: 10%;
`


const PageNav = styled.div`
display: flex;
justify-content: center;
align-items: center;
background: red;
`

const PageSec = styled.button`
background: green
margin: 5% ;
`
function Board():JSX.Element {
//역시 axios로 해당 게시판 글들 긁어와서 렌더링 query값이 없으면 기본 1페이지, query로 페이지 생각

    

    return (
        <MainContainer>
    

        <BoardWrap>
            <BoardName>게시판 이름</BoardName>
            <ChildBoard>
                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>
                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>
                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>
                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>
                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>

                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>

                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>

                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>

                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>

                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>

                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>
                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>
                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>
                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>
                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>
                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>
            </ChildBoard>

            



        </BoardWrap>
        <PageNav>
            <PageSec>1</PageSec>
            <PageSec>2</PageSec>
            <PageSec>3</PageSec>
        </PageNav>
        </MainContainer>
    )
    
}

export default Board;
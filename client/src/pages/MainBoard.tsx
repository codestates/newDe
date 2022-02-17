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

function MainBoard():JSX.Element{
    //axios를 이용 게시글 정보 받아와서 렌더링  
    //http://localhost:8080/board/front, /back 을 각각 가져와서 최근 5개씩 렌더링 
    

    
    return(
        <MainContainer>
    

        <BoardWrap>
            <BoardName>프론트 게시판</BoardName>
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
            </ChildBoard>

            <BoardName>백엔드 게시판</BoardName>
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
            </ChildBoard>



        </BoardWrap>
        </MainContainer>
    )
        
}

export default MainBoard
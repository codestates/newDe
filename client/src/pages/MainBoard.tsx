//메인 게시판
import react from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {ContentList} from '../component';


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
text-align: left;
font-weight: bold;`


const Contentusersec = styled.div`
width: 10%;
font-weight: bold;
`

const Contentlike = styled.div`
width: 10%;
font-weight: bold;
`


function MainBoard():JSX.Element{
    //axios를 이용 게시글 정보 받아와서 렌더링  
    //http://localhost:8080/board/ front /back 을 각각 가져와서 최근 5개씩 렌더링 
    
//arr.map 시 id = contentId로 주면 됨 해당 콘텐츠 아이디는 콘텐츠뷰로 넘길 때 /board/113 식으로 넘기면 됨 
    
    
    const dummy = [{id: 1, contenttitle: '안녕', user: '바보', like: 32},{id: 2, contenttitle: '안녕', user: '바보', like: 32}]
    const datatoList = dummy.map((el)=>{
        return (<ContentWrap key = {el.id}>
            <ContentList id = {el.id} title = {el.contenttitle} like = {el.like} user = {el.user} />
        </ContentWrap>)
        


        })

 

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
                
                {datatoList}
                
            </ChildBoard>

            <BoardName>백엔드 게시판</BoardName>
            <ChildBoard>
            <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>

                </ContentWrap>
                {datatoList}
            </ChildBoard>



        </BoardWrap>
        </MainContainer>
    )
        
}

export default MainBoard
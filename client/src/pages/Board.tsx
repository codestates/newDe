//게시판 보기 
import react from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {ContentList} from '../component';

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
.btn {
    text-decoration-line: none;
    color: #34495E;
    &:hover {
      cursor: pointer;
      outline: none;
      color: black;
    }


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
display: flex;
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

const WritingBtn = styled.button`
`

const NameSec = styled.div`
width: 80%;
`
function Board():JSX.Element {
//역시 axios로 해당 게시판 글들 긁어와서 렌더링 query값이 없으면 기본 1페이지, query로 페이지 생각

const nowURL = new URL(window.location.href); //URL값 따오기 
// console.log(nowURL)
const firstCategory = nowURL.searchParams.get('firstCategory');
const secondCategory = nowURL.searchParams.get('secondCategory'); //각각의 카테고리를 얻었음 

//이걸 이용  서버에서 글 목록을 가져오고 -> 그 글 목록을 렌더링 ,useEffect 사용하면 될까 

const dummy = [{id: 1, contenttitle: '안녕', user: '바보', like: 32},{id: 2, contenttitle: '안녕', user: '바보', like: 32},{id: 3, contenttitle: '안녕', user: '바보', like: 32}
,{id: 4, contenttitle: '안녕', user: '바보', like: 32},
{id: 5, contenttitle: '안녕', user: '바보', like: 32}]
const datatoList = dummy.map((el)=>{
    return (<ContentWrap key = {el.id}>
        <ContentList id = {el.id} title = {el.contenttitle} like = {el.like} user = {el.user} />
    </ContentWrap>)
    


    })

    return (
        <MainContainer>
    

        <BoardWrap>
            <BoardName>
                <NameSec>게시판 이름 </NameSec>
                
                <WritingBtn><Link to = '/writing' className = 'btn'>글쓰기</Link></WritingBtn>

            </BoardName>
            <ChildBoard>
                <ContentWrap>
                    <Contenttitle>제목</Contenttitle>
                    <Contentusersec>글쓴이</Contentusersec>
                    <Contentlike>추천</Contentlike>
                    


                </ContentWrap>
                
                {datatoList}
                
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
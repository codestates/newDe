//게시판 보기 
import react, { useEffect } from 'react'
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {ContentList, PageNav, LeftNav} from '../component';
import { apiURL } from '../url'
import { RootState } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setChild, setParent } from '../features/info';



const MainContainer = styled.div`
margin-top: 7%;
display: flex;
text-align: center;
flex-direction: column;
background : white;
width: 100%;
.btn {
    text-decoration-line: none;
    color: #34495E;
    &:hover {
      cursor: pointer;
      outline: none;
      color: black;
    }
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
margin: 0.5% 0.5% 0.5% 0.5%;
`


const PageNavWrap = styled.div`
display: flex;
justify-content: center;
align-items: center;

`

const PageSec = styled.button`
background: green;
margin: 5% ;
`

const WritingBtn = styled.button`
`

const NameSec = styled.div`
width: 80%;
font-weight: bold;
`

const SearchingWrap = styled.div`
display: flex;
width: 50%;
margin: 3%;
`

const InputWrap = styled.input`
margin: 2%;
width: 80%;
background-color: seashell;

`

const SearchBtn = styled.button`
margin: 1%;
`
function Board(props: any):JSX.Element {
    const isLogin = useAppSelector((state: RootState) => state.info.login)
//역시 axios로 해당 게시판 글들 긁어와서 렌더링 query값이 없으면 기본 1페이지, query로 페이지 생각
const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };

const dispatch = useAppDispatch()
const location = useLocation()

// const queryParams = new URLSearchParams()
// console.log(queryParams)
const nowURL = new URL(window.location.href); //URL값 따오기 

const ParentCategory = nowURL.searchParams.get('parentcategory');
const ChildCategory = nowURL.searchParams.get('childcategory'); //각각의 카테고리를 얻었음 
// console.log(ParentCategory)

const [loading, setLoading] = useState(false);
const [contentlist, setList] = useState([]); 
const [nowpage, setPage] = useState(1); //페이지
const [searching, setSearchWord] = useState('') //검색어
const [inputInfo, setInputInfo] = useState('')
const [maxpage, setMax] = useState(1)

const [pageChanged, setPageChanged] = useState(false);

//이걸 이용  서버에서 글 목록을 가져오고 -> 그 글 목록을 렌더링 ,useEffect 사용하면 될까 


const datatoList = contentlist.map((el:any)=>{
    return (<ContentWrap key = {el.id}>
        <ContentList id = {el.id} title = {el.title} like = {el.like} user = {el.user.nickname} date = {el.createdAt.slice(0,10)} />
    </ContentWrap>)
    })

    


const getListData = async () =>{
    const listData = await axios.get(`${apiURL}/board?page=${nowpage}&parentCategory=${ParentCategory}&${ChildCategory ? `childCategory=${ChildCategory}` :''}&searching=${searching}` )
    // console.log(listData.data.pageCount)
    try{
        setList(listData.data.data)
        setMax(listData.data.pageCount)
    }
    catch{console.log("error!")} 
}


const handleInput = (event: react.ChangeEvent<HTMLInputElement>) => {
    setInputInfo(event.target.value)
}

const handleSubmit = () =>{
    // console.log(inputInfo)
    setSearchWord(inputInfo)
}

const handlePage = (el:number) =>{
    setPage(el)
    // console.log(nowpage)

}
dispatch(setParent(ParentCategory))
dispatch(setChild(ChildCategory))

const pagehandler = () => {
    setPageChanged(true)
}

useEffect(()=>{
    setLoading(true);
    setPageChanged(false);
    getListData();
    setLoading(false)    

},[pageChanged, searching, nowpage])




    return (
        <MainContainer>
            <LeftNav setPageChanged={pagehandler}/>
    

        <BoardWrap>
            <BoardName>
                <NameSec>{ChildCategory ? ChildCategory : ParentCategory } </NameSec>
                {isLogin ? (ChildCategory ? <WritingBtn><Link to = '/writing' className = 'btn' >글쓰기</Link></WritingBtn> : null) : null}
                {/* {ChildCategory ? <WritingBtn><Link to = '/writing' className = 'btn' >글쓰기</Link></WritingBtn> : null } */}
                

            </BoardName>
            <ChildBoard>
                {datatoList}               
            </ChildBoard>

            



        </BoardWrap>
        <SearchingWrap> <InputWrap type = 'search' onChange = {handleInput} /> <SearchBtn onClick = {handleSubmit}>검색</SearchBtn> </SearchingWrap>
        <PageNavWrap>
            <PageNav maxpage = {maxpage} nowpage = {nowpage} pagehandler= {handlePage}/>            
        </PageNavWrap>
        </MainContainer>
    )
    
}

export default Board;
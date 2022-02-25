//글 보기 
import react, { useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {Comment, WriteComment} from '../component';
import { apiURL } from '../url'
import { RootState } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'

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

const WriterSec = styled.div`
width: 90%;
background: aquamarine;

`

const MainContent = styled.div`
overflow: scroll;
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
width: 80%;
height: 10%;
justify-content: center;
background: Goldenrod;

`
const LikeBtn = styled.button`
`

function ContentView ():JSX.Element {
    const isLogin = useAppSelector((state: RootState) => state.info.login)

    const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      };
    const nowURL = new URL(window.location.href); //URL값 따오기 
    const path = nowURL.pathname.slice(1) //해당 게시글 번호 이 번호로 axios 를 보내면 된다 
   

   
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState({id: '',
title: '', main : '', like: 0, nickname: ''})
    const [commentlist, setComment] = useState([])


const getcontent = async () =>{
    const result =  await axios.get(`${apiURL}/board/${path}`)
    const info = result.data.data
    // console.log(info.title)
    setContent({id: info.id,
    title: info.title, main : info.main, like: info.like, nickname: info.user.nickname})
}

const getComment = async () => {

    const commentresult = await axios.get(`${apiURL}/comment/${path}`, config)
    // console.log(commentresult.data.data)
    setComment(commentresult.data.data)


}

    useEffect(()=>{
        setLoading(true);
        getcontent()
        getComment()
        
        
        
        setLoading(false)


    }, []


    )
    
    
    const datatoComment = commentlist.map((el:any)=>{
        return (
            <CommentWrap key = {el.id}>
                <Comment id = {el.id} main = {el.main} nickname={el.user.nickname}  />

            </CommentWrap>
        )
    })

    const likehandler = () => {
        axios.patch(`${apiURL}/board/recommend`, {contentId: path}, config)
    }
    

    return (
        
        <MainContainer>
            {loading ? null : 
                <PageWrap>
                <ContentWrap>
                    <TitleWrap>
                        <TitleSec>{content.title}</TitleSec>
                        <ContentBtn>수정</ContentBtn>
                        <ContentBtn>삭제</ContentBtn>
                    </TitleWrap>
                    <WriterSec>{content.nickname ? content.nickname: "탈퇴한 회원입니다."}</WriterSec>
                    <MainContent dangerouslySetInnerHTML={{__html:content.main}}></MainContent>
                    {isLogin ? <LikeBtn onClick = {likehandler}>추천</LikeBtn> : null}
                    
                    
                </ContentWrap>
                    {datatoComment}
                
                <WritingBox>
                {isLogin ? <WriteComment contentid = {path}/> :null}
                
                </WritingBox>
                
                
                </PageWrap> }
            
            
            
        </MainContainer>
        
        

    )
    
}

export default ContentView;
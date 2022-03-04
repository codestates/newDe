//글 보기 
import react, { useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {Comment, WriteComment, AlertModal, DeleteAlert, LeftNav} from '../component';
import { apiURL } from '../url'
import { RootState } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faBug } from '@fortawesome/free-solid-svg-icons';

const MainContainer = styled.div`
margin-top: 7%;
width: 100%;
@media ${(props)=> props.theme.mobile}{
    margin-top: 30%;
}
`

const PageWrap = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;

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
width: 70%;
height: 100%;
`

const TitleWrap = styled.h1`
display: flex;
justify-content: space-between;
font-size: 25px;
width: 90%;

`

const TitleSec = styled.div`
width: 80%;
font-size:30px;
`

const ContentBtn = styled.button`
width: 50%;
border: none;
background-color: white;
font-size: 20px;
&:hover,:focus {
      cursor: pointer;
      outline: none;
      transform: scale(1.05);
    }
`

const WriterSec = styled.div`
width: 90%;
color: gray;
padding-bottom: 5px;
border-bottom: 1px solid #C4C4C4;
`

const UserName = styled.span`
margin-left: 15px;
`

const MainContent = styled.div`
word-wrap: break-word;
width: 90%;
height: 100%;
padding: 15px 0 15px 0;
margin-bottom: 15px;
border-bottom: 1px solid #C4C4C4;
`

const CommentWrap = styled.div`
width: 70%;
display: flex;
flex-direction: column;
align-items: center;
`

const WritingBox = styled.div`
width: 70%;
height: 10%;
justify-content: center;

`
const ButtonSec = styled.div`
display: flex;
width: 10%;
`
const LikeBtn = styled.button`
border: none;
background-color: white;
font-size: 20px;
&:hover,:focus {
      cursor: pointer;
      outline: none;
      transform: scale(1.05);
      color: red;
    }
`

function ContentView ():JSX.Element {
    const isLogin = useAppSelector((state: RootState) => state.info.login)
    // const isLogin = true;
    const usernickname = useAppSelector((state: RootState) => state.info.nickname)
    const isAdmin = useAppSelector((state: RootState)=> state.info.admin )
    const navigate = useNavigate()
    const [deleteModal, setDelModal] = useState(false)

    const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      };
    const nowURL = new URL(window.location.href); //URL값 따오기 
    const path = nowURL.pathname.slice(1) //해당 게시글 번호 이 번호로 axios 를 보내면 된다 
   

    const [alertOpened, setAlert] = useState(false)
    const [modalMessage, setMessage] = useState('')
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState({id: '',
title: '', main : '', like: 0, nickname: '', createdat: ''})
    const [commentlist, setComment] = useState([])
    const [like, setlike] = useState(0)
    



const getcontent = async () =>{
    const result =  await axios.get(`${apiURL}/board/${path}`)
    const info = result.data.data
    // console.log(info)
    setContent({id: info.id,
    title: info.title, main : info.main, like: info.like, nickname: info.user.nickname, createdat: info.createdAt.slice(0,10)})
    setlike(info.user.like)
}

const getComment = async () => {

    const commentresult = await axios.get(`${apiURL}/comment/${path}`, config)
    setComment(commentresult.data.data)
}

console.log(commentlist)

    useEffect(()=>{
        setLoading(true);
        getcontent()
        getComment()
        setLoading(false)
    }, [like])
    
    
    const datatoComment = commentlist.map((el:any)=>{
        return (
            <CommentWrap key = {el.id}>
                <Comment id = {el.id} main = {el.main} nickname={el.user.nickname} contentid = {path} createdAt={el.created_at.slice(0,10)} />
            </CommentWrap>
        )
    })

    const likehandler = () => {
        axios.patch(`${apiURL}/board/recommend`, {contentId: path}, config)
        .then(el=>{
            
            setlike(like+1)
            
        }
            )
    }
    
    const reporthandler = () => {
        axios.patch(`${apiURL}/board/report`,{contentId: path}, config)
        .then(el=>{
            setAlert(true)
            setMessage('신고되었습니다.')
        })
    }

    const handleModify = () =>{      
        const url = window.location.href;  
        const contentId = url.split('/')[url.split('/').length-1];
        console.log(url.split('/'))
        navigate(`/writing/${contentId}`)
    }

    const handleDelete = () =>{
        setDelModal(true)
            //삭제확인모달을 띄워주고 실제 삭제는 해당 모달에서 진행하세요 
    }

    const alerthandler = () => {
        setAlert(false)
    }
    const deletehandler = () => {

        setDelModal(false)
        
    }
    return (
        
        <MainContainer>
        {alertOpened ? <AlertModal message = {modalMessage} modalhandler = {alerthandler} />: null} 
        {deleteModal ? <DeleteAlert modalhandler = {deletehandler} path = {path}  />: null}
            <LeftNav />
            {loading ? null : 
                <PageWrap>
                <ContentWrap>
                    <TitleWrap>
                        <TitleSec>{content.title}</TitleSec>
                        {usernickname === content.nickname ||isAdmin === true ? 
                        <ButtonSec>
                            <ContentBtn onClick = {handleModify}><FontAwesomeIcon icon={faPen} /></ContentBtn>
                            <ContentBtn onClick = {handleDelete}><FontAwesomeIcon icon={faTrash} /></ContentBtn>
                        </ButtonSec>
                        : (isLogin ?
                            <ButtonSec>
                                <ContentBtn onClick = {reporthandler}><FontAwesomeIcon icon={faBug}/></ContentBtn>
                            </ButtonSec>
                                : null)}
                    </TitleWrap>
                    <WriterSec>
                        <span>{content.createdat}</span>
                        <UserName>{content.nickname ? content.nickname: "탈퇴한 회원입니다."}</UserName>
                    </WriterSec>
                    <MainContent dangerouslySetInnerHTML={{__html:content.main}}></MainContent>
                    {isLogin ? <LikeBtn onClick = {likehandler}><FontAwesomeIcon icon={faHeart}/> {content.like}</LikeBtn> : null}
                </ContentWrap>
                <WritingBox>
                {isLogin ? <WriteComment contentid = {path} ismodify = {false} content = {''} commentid = {''}/> :null}
                </WritingBox>
                    {datatoComment}
                </PageWrap> }
        </MainContainer>
        
        

    )
    
}

export default ContentView;
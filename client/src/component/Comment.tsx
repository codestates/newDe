//메인 게시판
import react from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { RootState } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { apiURL } from '../url';
import {WriteComment, CommentDeleteModal} from '../component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CommentContainer = styled.div`
margin-top: 15px;
display: flex;
flex-direction: column;
width: 80%;
padding-bottom: 6px;
border-bottom: 1px solid #C4C4C4;
`

const InfoWrap = styled.div`
width: 100%;
 display: flex;
 > span {
     font-size: 20px;
     width: 15%;
     color: gray;
 }
`

const CommentBtn = styled.button`
width: 100%;
border: none;
background-color: white;
font-size: 20px;
&:hover,:focus {
      cursor: pointer;
      outline: none;
      transform: scale(1.05);
    }
`

const UpperWrap = styled.div`
 display: flex;
 align-items: center;
 justify-content: space-between;
 width: 100%;
`
const ButtonSec = styled.div`
display: flex;
width: 10%;
`

const UserPart = styled.div`
width: 10%;
font-size: 20px;
`

const CommentContent = styled.div`
width: 95%;
margin: 5px 0 5px 0;
font-size: 15px;
word-wrap: break-word;
font-family: "NotoSans-DemiLight";
`
//props로 댓글 내용, 글쓴이등 가져와 

interface commentprops {
    id: string
    main: string
    nickname: string
    contentid: string
    createdAt: string


}
function Comment(props: commentprops):JSX.Element {
    const isLogin = useAppSelector((state: RootState) => state.info.login)
    // const isLogin = true;
    const usernickname = useAppSelector((state: RootState) => state.info.nickname)
    // const usernickname = props.nickname
    // console.log(props)
    const isAdmin = useAppSelector((state: RootState)=> state.info.admin )

    const [updated, setUpdated] =useState(false )
    const [modalopened, setmodal] = useState(false)

    const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      };

    const reportHandler = () => {
        axios.patch(`${apiURL}/comment/report`,{commentId: props.id}, config)
        .then(el => alert('신고되었습니다.'))
    }

    const deleteHandler = () => {
        setmodal(true)
        // axios.delete(`${apiURL}/comment/${props.id}`, config)
        //     .then(el=>alert("삭제되었습니다"))
        //     window.location.reload();
            
    }
    
    const modifyHandler = () => {
        
        setUpdated(true)

    }
    const deletehandler = () => {
        setmodal(false)
    }
    return (
        <CommentContainer>
            {modalopened ? <CommentDeleteModal modalhandler = {deletehandler} path = {props.id}  />: null}
            {updated ? 
            <WriteComment contentid = {props.contentid} ismodify = {true} content = {props.main} commentid= {props.id}/> 
            : 
            <div>
            <UpperWrap>
                <InfoWrap>
                    <UserPart>{props.nickname}</UserPart>
                    <span>{props.createdAt}</span>
                </InfoWrap>
                {isLogin ? (usernickname === props.nickname || isAdmin === true ?
                <ButtonSec>
                    <CommentBtn onClick = {modifyHandler}><FontAwesomeIcon icon={faPen} /></CommentBtn>
                    <CommentBtn onClick = {deleteHandler}><FontAwesomeIcon icon={faTrash} /></CommentBtn>
                </ButtonSec>
                : 
                <ButtonSec><CommentBtn onClick = {reportHandler}><FontAwesomeIcon icon={faBug}/></CommentBtn></ButtonSec>
                ) : null }
            </UpperWrap>
            <CommentContent>{props.main}</CommentContent>
            </div>
        }
        </CommentContainer>
    )        
}

export default Comment
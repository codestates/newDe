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

const CommentContainer = styled.div`
display: flex;
flex-direction: column;

width: 95%;
background: skyblue;
margin: 1%;
`

const CommentBtn = styled.button`
width: 50%;
background-color: gainsboro;
margin: 1%;
`

const UpperWrap = styled.div`
display: flex;
background: mintcream;

margin: 1%;
width: 95%;


`
const ButtonSec = styled.div`
display: flex;
width: 20%;
`

const UserPart = styled.div`
width: 80%;
background: coral;`

const CommentContent = styled.div`
background: tomato;
width: 95%;
margin: 1%;
`
//props로 댓글 내용, 글쓴이등 가져와 
function Comment(props: any):JSX.Element {
    const isLogin = useAppSelector((state: RootState) => state.info.login)
    // const isLogin = true;
    const usernickname = useAppSelector((state: RootState) => state.info.nickname)
    // const usernickname = props.nickname
    // console.log(props)

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

        axios.delete(`${apiURL}/comment/${props.id}`, config)
            .then(el=>alert("삭제되었습니다"))
    }

    return (
        <CommentContainer>
            <UpperWrap>
                <UserPart>{props.nickname}</UserPart>
                {isLogin ? (usernickname === props.nickname ?
                <ButtonSec>
                <CommentBtn>수정</CommentBtn>
                <CommentBtn>삭제</CommentBtn>
                </ButtonSec>
                : 
                <ButtonSec><CommentBtn onClick = {reportHandler}>신고</CommentBtn></ButtonSec>
                ) : null }
                
            

            </UpperWrap>
            <CommentContent>{props.main}</CommentContent>
        
        
        </CommentContainer>



    )
        
}

export default Comment
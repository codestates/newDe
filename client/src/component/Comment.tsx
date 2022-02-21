//메인 게시판
import react from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


const CommentContainer = styled.div`
display: flex;
flex-direction: column;

width: 95%;
background: skyblue;
margin: 1%;
`

const CommentBtn = styled.button`
background-color: gainsboro;
margin: 1%;
`

const UpperWrap = styled.div`
display: flex;
background: mintcream;

margin: 1%;
width: 95%;


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

    return (
        <CommentContainer>
            <UpperWrap>
                <UserPart>글쓴이</UserPart>
                <CommentBtn>수정</CommentBtn>
                <CommentBtn>삭제</CommentBtn>
            

            </UpperWrap>
            <CommentContent>댓글내용</CommentContent>
        
        
        </CommentContainer>



    )
        
}

export default Comment
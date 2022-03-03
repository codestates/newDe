//글목록 콤포넌트 
import axios from 'axios';
import styled from 'styled-components';
import { apiURL } from '../url'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import React from '../images/react.png'
import JavaScript from '../images/js.png'
import Node from '../images/Node.png'
import php from '../images/php.png'
import Python from '../images/python.png'
import CSSS from '../images/css.png'
import HTML from '../images/HTML.png'
import Java from '../images/Java.png'


const ContentWrap = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
height: 100%;
border-bottom: 1px solid #C4C4C4;
margin-bottom: 10px;
`
const Content = styled.div`
 display: flex;
 width: 80%;
 flex-direction: column;
 align-items: flex-start;
`

const TitleWrap = styled.div`
  display: flex;
  >div {
      margin-left: 5px;
      padding: 5px;
      font-size: 14px;
      color: white;
      background-color: #34495E;
      border-radius: 5px;
  }
`
const HashTag = styled.div`
 width: 10%;
 display: flex;
 align-items: center;
 justify-content: center;
 > img {
     width: 50px;
     height: 50px;
     margin-bottom: 10px;
 }
`

const User = styled.div`
 display: flex;
 margin: 5px 0 0 0;
`

const Contenttitle = styled.h1`
font-size: 20px;
cursor:pointer;
`


const Comment = styled.div`
width: 10%;
 >div {
    font-size: 20px;
 }
`

const CommentNum = styled.div`
 margin-top: 5px;
`

const Contentusersec = styled.div`
 margin-right: 10px;
`

const Contentlike = styled.div`
color: gray;
font-size: 15px;
margin-top: 3px;
`

interface ListCompo {
    id: number,
    title: string,
    user: string,
    like: number,
    date: number,
    childCategory: string
}



//props로 글 제목, 글 번호, 글쓴이 추천수 등 가져올것 
function ContentList(props: ListCompo):JSX.Element {
    const [commentNum, setCommentNum] = useState(''); 
    const [logo, setLogo] = useState('');

    const getLogo = () => {
        if(props.childCategory === "React") {
            setLogo(React)
        }
        
        if(props.childCategory === "JavaScript") {
            setLogo(JavaScript)
        }

        if(props.childCategory === "Node") {
            setLogo(Node)
        }

        if(props.childCategory === "php") {
            setLogo(php)
        }

        if(props.childCategory === "Python") {
            setLogo(Python)
        }

        if(props.childCategory === "CSS") {
            setLogo(CSSS)
        }

        if(props.childCategory === "HTML") {
            setLogo(HTML)
        }

        if(props.childCategory === "Java") {
            setLogo(Java)
        }
    }

    const getId = async () => {
        try{
            const getIdData = await axios(`${apiURL}/comment/${props.id}`)
            setCommentNum(getIdData.data.data.length)
        }
        catch(err){
            console.log(err)
        }
 
    }

    useEffect(()=>{
        getId()
        getLogo()
    },[])


    const navigate = useNavigate();
    function clickHandler(){
        navigate(`/${props.id}`)
    }


    return (
        <ContentWrap>
            <HashTag><img src={logo} alt='logo' /></HashTag>
            <Content>
                <TitleWrap>
                    <Contenttitle onClick = {clickHandler}>{props.title}</Contenttitle>
                </TitleWrap>
                <User>
                    <Contentusersec>{props.user?props.user:'탈퇴한 회원'}</Contentusersec>
                    <span>{props.date}</span>
                </User>
                <Contentlike>{props.like} likes</Contentlike>
            </Content>
            <Comment>
                <div>답변</div>
                <CommentNum>{commentNum}</CommentNum>
            </Comment>
        </ContentWrap>



    )
        
}

export default ContentList
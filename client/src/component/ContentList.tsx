//글목록 콤포넌트 
import axios from 'axios';
import styled from 'styled-components';
import { apiURL } from '../url'
import { useNavigate } from 'react-router-dom';
import react, { useEffect, useState } from 'react'
import { userInfo } from 'os';



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
 flex-direction: column;
 align-items: flex-start;
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
    date: number

}



//props로 글 제목, 글 번호, 글쓴이 추천수 등 가져올것 
function ContentList(props: ListCompo):JSX.Element {
    const [commentNum, setCommentNum] = useState(''); 
        // console.log(props.id)
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
    },[])


    const navigate = useNavigate();
    function clickHandler(){
        navigate(`/${props.id}`)

    }


    return (
        <ContentWrap>
            <Content>
                <Contenttitle onClick = {clickHandler}>{props.title}</Contenttitle>
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
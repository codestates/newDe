//글목록 콤포넌트 
import react from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


const ContentWrap = styled.div`
display: flex;
justify-content: center;
width: 100%;
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
interface ListCompo {
    id: number,
    title: string,
    user: string,
    like: number

}


//props로 글 제목, 글 번호, 글쓴이 추천수 등 가져올것 
function ContentList(props: ListCompo):JSX.Element {
    // console.log(props)

    return (
        <ContentWrap>
            
            <Contenttitle>{props.title}</Contenttitle>
            <Contentusersec>{props.user}</Contentusersec>
            <Contentlike>{props.like}</Contentlike>
            
        </ContentWrap>



    )
        
}

export default ContentList
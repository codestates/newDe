import styled from 'styled-components';
import { apiURL } from '../url'
import { useState } from 'react';
import axios from 'axios';
import { AiTwotoneWarning } from 'react-icons/ai';

const FormBox = styled.form`
display: flex;

margin: 0;
width: 100%;
height: 100%;
background-color: seashell;


`


const TextArea = styled.textarea`
margin: 2%;
width: 85%;
`
const SubmitBtn = styled.button`
margin-top: 3%;

height: 50%;
`

interface writingprops {
    contentid: string;
    ismodify: boolean;
    content : string;
    commentid: string;
}


function WriteComment(props: writingprops):JSX.Element {
    const [inputText, setText] = useState(props.content)
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
      };
    
    

    const handleinput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        // console.log(event.target.value)
        setText(event.target.value)
    }


    const submitHandler = () => {
        // console.log(props.contentid)
        
        if(props.ismodify === true){
            axios.patch(`${apiURL}/comment`, {commentId: props.commentid, main: inputText}, config)
        }
        else {
            axios.post(`${apiURL}/comment`, {contentId: props.contentid, main: inputText}, config)
        }
        
        


    }
    return (
        <FormBox>
            <TextArea defaultValue = {props.content} onChange = {handleinput}/>
            {props.ismodify ? <SubmitBtn onClick = {submitHandler}>댓글 수정</SubmitBtn>: <SubmitBtn onClick = {submitHandler}>댓글 쓰기</SubmitBtn>}
            
        </FormBox>
    )
    
}

export default WriteComment;
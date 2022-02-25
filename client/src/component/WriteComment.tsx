import styled from 'styled-components';
import { apiURL } from '../url'
import { useState } from 'react';
import axios from 'axios';

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
}


function WriteComment(props: writingprops):JSX.Element {
    const [inputText, setText] = useState('')
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
        axios.post(`${apiURL}/comment`, {contentId: props.contentid, main: inputText}, config)


    }
    return (
        <FormBox>
            <TextArea onChange = {handleinput}/>
            <SubmitBtn onClick = {submitHandler}>댓글 쓰기</SubmitBtn>
        </FormBox>
    )
    
}

export default WriteComment;
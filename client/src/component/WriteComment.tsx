import styled from 'styled-components';
import { apiURL } from '../url'
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const FormBox = styled.form`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
`


const TextArea = styled.textarea`
margin: 2%;
width: 75%;
resize: none;
`
const SubmitBtn = styled.button`
border: none;
background-color: white;
height: 50px;
width: 100px;
font-size: 30px;
&:hover,:focus {
      cursor: pointer;
      outline: none;
      transform: scale(1.05);
    }
`

interface writingprops {
    contentid: number;
    ismodify: boolean;
    content : string;
    commentid: number;
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
        if(inputText){
            if(props.ismodify === true){
                axios.patch(`${apiURL}/comment`, {commentId: props.commentid, main: inputText}, config)
            }
            else {
                axios.post(`${apiURL}/comment`, {contentId: props.contentid, main: inputText}, config)
            }

        }
        
        
        
        


    }
    return (
        <FormBox>
            <TextArea defaultValue = {props.content} onChange = {handleinput}/>
            {props.ismodify ? <SubmitBtn onClick = {submitHandler}><FontAwesomeIcon icon={faPen} /></SubmitBtn>: <SubmitBtn onClick = {submitHandler}><FontAwesomeIcon icon={faKeyboard}/></SubmitBtn>}
        </FormBox>
    )
    
}

export default WriteComment;
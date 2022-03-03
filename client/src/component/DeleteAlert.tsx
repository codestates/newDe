import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { apiURL } from '../url'

const Background = styled.div`
margin-top: 7%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
position: absolute;
background: ghost;
width: 100%;
height: 100%;
`
const ContainerWrap = styled.div`

display: flex;
flex-direction: column;
border: 1px solid black;
position:absolute;
align-items:center;
justify-content: center;
width: 30%;
background: Whitesmoke;
opacity: 90%;
padding: 10px;
z-index: 2;


.btn {
    text-decoration-line: none;
    color: #34495E;
    &:hover {
      cursor: pointer;
      outline: none;
      color: black;
    }
}`

const MessageWrap = styled.div`


`
const ButtonWrap = styled.div`
display: flex;
width: 100%;
justify-content:center;
`
const ButtonSec = styled.button`
width: 30%;
margin-top: 5%;
margin : 5%;


`
const DelButtonSec = styled.button`
width: 30%;
margin-top: 5%;
margin : 5%;


`




function DeleteAlert (props:any):JSX.Element  {
    const navigate = useNavigate()
    const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      };
    const DeleteBtnHandler = () => {
        axios.delete(`${apiURL}/board/${props.path}`, config)
        .then(el => {
            props.modalhandler()//삭제 진행하고 모달을 끈 후 
            navigate('../mainboard')//네비게이트 진행 
            

        })

        
        
    }
    return (
        <Background >
            <ContainerWrap>
            <MessageWrap>삭제된 글은 복구할 수 없습니다. 정말 삭제하시겠습니까? </MessageWrap>
            <ButtonWrap>
                <DelButtonSec className = 'btn' onClick = {DeleteBtnHandler} >확인</DelButtonSec>
                <ButtonSec className = 'btn' onClick = {props.modalhandler} >취소</ButtonSec>
            </ButtonWrap>
            
            </ContainerWrap>
            
        </Background>
        
    )
}

export default DeleteAlert;
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { apiURL } from '../url'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setLogin, setOauth, setAdmin, setNickname } from '../features/info';

const Background = styled.div`
margin-top: 7%;
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 10%;
position: absolute;
background: ghost;
width: 100%;
height: 100%;
`
const ContainerWrap = styled.div`
margin-bottom: 10%;
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
background-color: red;


`

interface dropoutprops {
    modalhandler: ()=>void
}


function DropoutModal (props:dropoutprops):JSX.Element  {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      };
    const DeleteBtnHandler = () => {
        
        axios.patch(`${apiURL}/user/delete`,{}, config)
        .then(() => {
            navigate('/')
            
            dispatch(setOauth(false))  
            dispatch(setAdmin(false))
            dispatch(setNickname(''))
            
            props.modalhandler()//삭제 진행하고 모달을 끈 후 
            dispatch(setLogin(false))
            //네비게이트 진행 
            

        })

        
        
    }
    return (
        <Background >
            <ContainerWrap>
            <MessageWrap>정말 탈퇴하시겠습니까? </MessageWrap>
            <ButtonWrap>
                <DelButtonSec className = 'btn' onClick = {DeleteBtnHandler} >확인</DelButtonSec>
                <ButtonSec className = 'btn' onClick = {props.modalhandler} >취소</ButtonSec>
            </ButtonWrap>
            
            </ContainerWrap>
            
        </Background>
        
    )
}

export default DropoutModal;
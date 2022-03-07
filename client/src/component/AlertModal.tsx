import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom'

const Background = styled.div`

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
margin-bottom: 20%;
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

const ButtonWrap = styled.button`
margin-top: 5%;

`




function AlertModal (props:any):JSX.Element  {
    return (
        <Background >
            <ContainerWrap>
            <MessageWrap>{props.message}</MessageWrap>
            <ButtonWrap className = 'btn' onClick = {props.modalhandler} >확인</ButtonWrap>
            </ContainerWrap>
        </Background>
        
    )
}

export default AlertModal;
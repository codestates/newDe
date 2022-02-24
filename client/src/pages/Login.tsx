import react from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { RootState } from '../store'
import axios from 'axios';
import { URL } from '../url'


//배경
const MainContainer = styled.div`
display: flex;
position: absolute;
background : #F3F3F3;
width: 100%;
height: 100%;
text-align: center;
align-items: center;
justify-content: center;


`
//로그인 컨테이너
const LoginContainer = styled.div`

display: flex;
flex-direction: column;
align-items: center;
width: 40%;


@media ${(props)=> props.theme.mobile}{
    width: 100%;
    height: 100%;

}
`
//로고부분 
const LogoWrap = styled.div` 
margin-right: 3%;
width: 50%;
aligh-items: center;
text-align: center;`


//입력창 위 설명부분(email, 비밀번호 )
const NameWrap = styled.div`
margin: 4;
width: 80%;
text-align: left;
padding-left: 10px;
` 



//입력창 부분 
const InputWrap = styled.input`
margin: 2%;
width: 80%;
background-color: seashell;


`

const BtnContainer = styled.div`
display: flex;
flex-direction: column;
width: 80%;
align-items: center;
justify-content: center;
margin: 10px;
`

const BtnBox = styled.button`
border: 1px solid black;
border-radius: 3px;
width: 60%;
margin: 5px;
`



function Login (props: any):JSX.Element {
    
    const navigate = useNavigate();
    const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      };

    const [inputInfo, setInputInfo] = useState({
        email: '',
        password: ''
    })


    const handleInput = (event:react.ChangeEvent<HTMLInputElement>) => {
        
        if(event.target.type === 'email'){
            setInputInfo({
                ...inputInfo, 
                email: event.target.value, 
                
            })
        }
        if(event.target.type === 'password'){
            setInputInfo({
                ...inputInfo, 
                password: event.target.value
            })
        }
    
    }

    const loginSubmit = async (event: react.MouseEvent<HTMLButtonElement>) =>{
        // console.log(inputInfo)
        const loginresult = await axios.post(
            `${URL}/login`, 
            {email: inputInfo.email, password: inputInfo.password}, 
            config).then(el=>{
                props.loginhandler()
                navigate('/MyPage')
            })
        
    }

    const kakaologinSubmit = (event: react.MouseEvent<HTMLButtonElement>) =>{
        console.log(event.target)
        
    }

    const handleSignUpSubmit = () =>{
        navigate('/signup')
        
    }


    return  (
        <MainContainer>
            <LoginContainer>
                
                <LogoWrap>
                    
                    <img src = "images/biglogo.png" width= "100%"></img>
                </LogoWrap>
                <NameWrap>
                    email
                </NameWrap>
                <InputWrap type = 'email' placeholder = 'email' onChange = {handleInput} />
                    
                
                <NameWrap>
                    password
                </NameWrap>
                <InputWrap type= 'password' placeholder = 'password' onChange= {handleInput} />
                
                <BtnContainer>
                    
                    <BtnBox onClick = {loginSubmit}>로그인</BtnBox>
                    <BtnBox onClick = {kakaologinSubmit}>카카오 로그인</BtnBox>
                    <BtnBox onClick = {handleSignUpSubmit}>회원가입</BtnBox>

                </BtnContainer>

            </LoginContainer>



        </MainContainer>
            


    )
        
}

export default Login
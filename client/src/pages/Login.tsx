import react from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

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
<<<<<<< HEAD
`
//로그인 컨테이너
const LoginContainer = styled.div`
=======


`
//로그인 컨테이너
const LoginContainer = styled.div`

>>>>>>> 6247427a2d2ae334f4364e6b7e977f8dda4550f9
display: flex;
flex-direction: column;
align-items: center;
width: 40%;
<<<<<<< HEAD
@media ${(props)=> props.theme.mobile}{
    width: 100%;
    height: 100%;
=======


@media ${(props)=> props.theme.mobile}{
    width: 100%;
    height: 100%;

>>>>>>> 6247427a2d2ae334f4364e6b7e977f8dda4550f9
}
`
//로고부분 
const LogoWrap = styled.div` 
margin-right: 3%;
width: 50%;
<<<<<<< HEAD
=======

>>>>>>> 6247427a2d2ae334f4364e6b7e977f8dda4550f9
aligh-items: center;
text-align: center;`


//입력창 위 설명부분(email, 비밀번호 )
const NameWrap = styled.div`
margin: 4;
width: 80%;
text-align: left;
<<<<<<< HEAD
=======

>>>>>>> 6247427a2d2ae334f4364e6b7e977f8dda4550f9
padding-left: 10px;
` 



//입력창 부분 
const InputWrap = styled.input`
margin: 2%;
width: 80%;
background-color: seashell;
<<<<<<< HEAD
=======


>>>>>>> 6247427a2d2ae334f4364e6b7e977f8dda4550f9
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
<<<<<<< HEAD
=======

>>>>>>> 6247427a2d2ae334f4364e6b7e977f8dda4550f9
`



function Login ():JSX.Element {
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
        // console.log(event.target.value)
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
        console.log(event.target)
        const loginresult = await axios.post(
            'https//localhost:8080/user/login', 
            {email: inputInfo.email, password: inputInfo.password}, 
            config)
        
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
                <InputWrap type = 'email' placeholder = '이메일을 입력해주세요' onChange = {handleInput} />
                    
                
                <NameWrap>
                    password
                </NameWrap>
                <InputWrap type= 'password' placeholder = '비밀번호를 입력해주세요' />
                
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
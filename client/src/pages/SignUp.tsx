import react from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { useState } from 'react';
import axios from 'axios';
import { URL } from '../url'


const SignUpContainer = styled.div`
display: flex;
position: absolute;
width: 100%;
height: 100%;
background: #F3F3F3;
text-align: center;
align-items: center;
justify-content: center;
`

const SignUpWrap = styled.div`

display: flex;
flex-direction: column;
align-items: center;
width: 40%;



@media ${(props)=> props.theme.mobile}{
    width: 100%;
    height: 100%;

}
`

const LogoWrap = styled.div` 

width: 50%;

aligh-items: center;
text-align: center;
`


const NameWrap = styled.div`
margin-top: 1px;
width: 80%;
text-align: left;
padding-left: 10px;
margin-bottom: 0;
` 



//입력창 부분 
const InputWrap = styled.input`
margin: 2%;
width: 80%;
background-color: seashell;
margin-bottom: 0;



`
const CheckWrap = styled.div`
width: 80%;
text-align: left;
margin-top : 0;
margin-bottom: 1%;

`

const BtnBox = styled.button`
border: 1px solid black;
border-radius: 3px;
width: 20%;
margin: 5px;
&:hover,:focus {
    cursor: pointer;
    outline: none;
    transform: scale(1.05);
    background-color: pink;
  }`

const SubmitcheckWrap = styled.div`
color: red;
width: 80%;
text-align: center;
margin: 2%;

`

function SignUp():JSX.Element {
    const navigate = useNavigate();

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
        };
    const [inputInfo, setInputInfo] = useState({
        email: '',
        nickname: '',
        password: '',
        passwordCheck: ''
    });
    
    const [checkText, setCheckText] = useState({
        email: '',
        passwordCheck: '',
        submit: ''
    });
    const regEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    // const regPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/;
    


    const handleInput = (event:react.ChangeEvent<HTMLInputElement>) => {
        if (event.target.placeholder === 'email') {
          setInputInfo({ ...inputInfo, email: event.target.value });
        }
        if (event.target.placeholder === 'nickname') {
          setInputInfo({ ...inputInfo, nickname: event.target.value });
        }
        if (event.target.placeholder === 'password') {
          setInputInfo({ ...inputInfo, password: event.target.value });
        }
        if (event.target.placeholder === 'password check') {
          setInputInfo({ ...inputInfo, passwordCheck: event.target.value });
        }
      };
    const emailcheck = async (event: react.FocusEvent<HTMLInputElement>) => {
        // console.log(event.target.value)
        let newemail = event.target.value
        console.log(regEmail.test(newemail))
        if (regEmail.test(newemail)){
            const checkresult = await axios.post(
                `${URL}/check/email`, 
                {email: inputInfo.email}, config
            )

            if(checkresult.data.message = 'possible email'){
                setCheckText({...checkText, email: '사용 가능한 이메일입니다.'})
            }
            else{
                setCheckText({...checkText, email: '이미 가입되어있는 이메일입니다.'})
            }
            

        }
        else {
            setCheckText({...checkText, email: '잘못된 이메일 형식입니다.'})
            
        }
    }

    const passwordcheck = (event: react.FocusEvent<HTMLInputElement>) => {
        
        if(!inputInfo.password) {
            setCheckText({...checkText, passwordCheck: '비밀번호를 입력해주세요.'})
        }
        else if(inputInfo.password === event.target.value){
            setCheckText({...checkText, passwordCheck: '비밀번호가 일치합니다.'})
        }
        else {
            setCheckText({...checkText, passwordCheck: '비밀번호가 일치하지 않습니다.'})
        }

    }

    const handleSubmit = () => {
        if(checkText.email === '사용 가능한 이메일입니다.' && 
        checkText.passwordCheck === '비밀번호가 일치합니다.' && 
        inputInfo.nickname){
            const sendingInfo = {
                email: inputInfo.email,
                nickname: inputInfo.nickname, 
                password: inputInfo.password
            }
            

        }
        else {
            setCheckText({...checkText, submit: '항목을 모두 올바르게 입력해 주세요.'})
        }
    }

    return (
        <SignUpContainer>
            
            <SignUpWrap>
                
                <LogoWrap>
                    <img src = "images/biglogo.png" width= "100%"></img>
                </LogoWrap>
                <NameWrap>
                    email
                </NameWrap>
                <InputWrap type= 'email' placeholder = 'email' onChange ={handleInput} onBlur = {emailcheck}/>
                <CheckWrap>
                    {checkText.email ? checkText.email : "ㅤ" } 
                </CheckWrap>
                <NameWrap>
                    닉네임
                </NameWrap>
                <InputWrap type= 'nickname' placeholder = 'nickname' onChange ={handleInput}  />
                <CheckWrap>
                ㅤ
                </CheckWrap>
                <NameWrap>
                    password
                </NameWrap>
                <InputWrap type = 'password' placeholder = 'password' onChange ={handleInput}  />
                <CheckWrap>
                ㅤ
                </CheckWrap>
                <NameWrap>
                    password 확인
                </NameWrap>
                <InputWrap type = 'password' placeholder = 'passwordcheck' onChange ={handleInput} onBlur = {passwordcheck}  />
                <CheckWrap>
                    {checkText.passwordCheck ? checkText.passwordCheck : "ㅤ" }  
                </CheckWrap>
                <SubmitcheckWrap>
                {checkText.submit ? checkText.submit : "ㅤ" } 
                </SubmitcheckWrap>
                <BtnBox onClick = {handleSubmit}> submit</BtnBox>

               

            </SignUpWrap>
        </SignUpContainer>
           
        


    )
        
}

export default SignUp
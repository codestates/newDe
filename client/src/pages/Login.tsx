import react, { useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RootState } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import axios from 'axios';
import { apiURL } from '../url'
import { setLogin, setOauth, setAdmin } from '../features/info';


//배경
const LoginWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: whitesmoke;
`;
const LoginContainer = styled.div`
  width: 300px;
  height: 570px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  border: 2px solid #F1F1F1;
  .img {
    height: 250px;
  }
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .signup {
    cursor: pointer;
    background-color: white;
    border: 0;
    outline: 0;
    font-size: 1em;
    color: #666;
    margin-bottom: 10px;
    font-family: 'Do Hyeon', sans-serif;
  }
  .signup:hover {
    color: #34495E;
  }
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10px;
  text-align: center;
`;

const LoginInput = styled.input`
  border: 2px solid #F1F1F1;
  border-radius: 7px;
  height: 40px;
  width: 250px;
  font-size: 16px;
  margin-bottom: 3px;
`;

const FloatingText = styled.div`
  text-align: center;
  color: #C4C4C4;
  line-height: 40px;
`;

const LoginButton = styled.button`
    width: 80%;
    height: 2.5rem;
    border: none;
    border-radius: 10px;
    background-color: #34495E;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.9em;
    transition: all 0.5s;
    &:hover,:focus {
      cursor: pointer;
      outline: none;
      transform: scale(1.05);
      background-color: #000;
    }
`;

const KaKaoButton = styled.button`
    width: 80%;
    height: 2.5rem;
    border: none;
    border-radius: 10px;
    background-color: #FEE521;    
    color: #ffffff;
    font-weight: 700;
    transition: all 0.5s;
    &:hover,:focus {
      cursor: pointer;
      outline: none;
      transform: scale(1.05);
    }
    .cacao {
      height: 2.45rem;
    }
`;



function Login (props: any):JSX.Element {    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
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
            `${apiURL}/login`, 
            {email: inputInfo.email, password: inputInfo.password}, 
            config).then(el=>{
                dispatch(setLogin(true))
                if(el.data.data.admin){
                    dispatch(setAdmin(true))
                }
                
                navigate('/mypage')
            })
            
        }
        
        const kakaologinSubmit = async (event: react.MouseEvent<HTMLButtonElement>) =>{
                window.location.assign(`${apiURL}/kakao`)
                dispatch(setOauth(true))
                
                

        // 프론트에서 API정보를 보여주고 싶지 않기 때문에 서버로 보냄
        }

    const handleSignUpSubmit = () =>{
        navigate('/signup')
        
    }


    return  (
      <LoginWrap>
        <LoginContainer>
          <img src='images/logodd.png' alt='logo' className='img' />
          <InputWrap>
            <LoginInput type='email' placeholder='email' onChange={handleInput} />
            <LoginInput type='password' placeholder='password' onChange={handleInput} />
          </InputWrap>
          <br />
          <button className='signup' onClick={handleSignUpSubmit}>아직 계정이 없습니까?</button>
          <LoginButton className='loginBtn' onClick={loginSubmit}>Login</LoginButton>
          <FloatingText>──────   또는   ──────</FloatingText>
          <KaKaoButton className='githubBtn' onClick={kakaologinSubmit}><img src='/images/kakao.png' alt='logo' className='cacao' /></KaKaoButton>
        </LoginContainer>
      </LoginWrap>         
    )
        
}

export default Login
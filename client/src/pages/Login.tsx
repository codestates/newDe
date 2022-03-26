import react, { useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RootState } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import axios from 'axios';
import { apiURL } from '../url'
import { setLogin, setOauth, setAdmin, setNickname } from '../features/info';
import { AlertModal} from '../component';


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



function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const week = ['일', '월', '화', '수', '목', '금', '토']
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
  const [alertOpened, setAlert] = useState(false)
  const [alertMessage, setMessage] = useState('')

  const handleInput = (event: react.ChangeEvent<HTMLInputElement>) => {

    if (event.target.type === 'email') {
      setInputInfo({
        ...inputInfo,
        email: event.target.value,

      })
    }
    if (event.target.type === 'password') {
      setInputInfo({
        ...inputInfo,
        password: event.target.value
      })
    }

  }
  function alerthandler () {
    setAlert(false)
  }
  

  const loginSubmit = () => {
    
      axios.post(
        `${apiURL}/login`,
        { email: inputInfo.email, password: inputInfo.password },
        config).then(el => {
          dispatch(setLogin(true))
          dispatch(setNickname(el.data.data.nickname))
          if (el.data.data.admin) {
            dispatch(setAdmin(true))
          }
          navigate('/mypage')
        })
    .catch ((err) => {
      // console.log(err.response.data.data)
      if(err.response.data.message='temporarily banned user'){
        let penaltytime = new Date(err.response.data.data.penalty)
        setMessage(`${penaltytime.getFullYear()}년 ${penaltytime.getMonth()+1}월 ${penaltytime.getDate()}일 ${week[penaltytime.getDay()]}요일 까지 차단된 계정입니다.`)
        setAlert(true)
      }
      else{alert('아이디 또는 비밀번호가 틀립니다')}
      
    })

  }

  const kakaologinSubmit = async (event: react.MouseEvent<HTMLButtonElement>) => {
    window.location.assign(`${apiURL}/kakao`)
    dispatch(setOauth(true))



    // 프론트에서 API정보를 보여주고 싶지 않기 때문에 서버로 보냄
  }

  const handleSignUpSubmit = () => {
    navigate('/signup')
  }
  const handleClickEnter = (e: any) => {
    if (e.key === 'Enter') {
      loginSubmit();
    }
  };



  return (
    <LoginWrap>
      <LoginContainer>
        <img src='images/logodd.png' alt='logo' className='img' />
        <InputWrap>
          <LoginInput type='email' placeholder='email' onChange={handleInput} />
          <LoginInput type='password' placeholder='password' onChange={handleInput} onKeyPress={handleClickEnter} />
        </InputWrap>
        <br />
        <button className='signup' onClick={handleSignUpSubmit}>아직 계정이 없습니까?</button>
        <LoginButton className='loginBtn' onClick={loginSubmit}>Login</LoginButton>
        <FloatingText>──────   또는   ──────</FloatingText>
        <KaKaoButton className='githubBtn' onClick={kakaologinSubmit}><img src='/images/kakao.png' alt='logo' className='cacao' /></KaKaoButton>
      </LoginContainer>
      {alertOpened ? <AlertModal message = {alertMessage} modalhandler = {alerthandler} />: null}
    </LoginWrap>
  )

}

export default Login
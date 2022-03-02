import react from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { apiURL } from '../url'
import { useNavigate } from 'react-router';


const SignUpWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: whitesmoke;
`;

const SignUpContainer = styled.div`
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
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10px;
  text-align: center;
  span {
    font-size: 8px;
    color: red;
    margin-bottom: 2px;
  }
  span.green {
    color: green;
  }
`;

const SignUpInput = styled.input`
  border: 2px solid #F1F1F1;
  border-radius: 7px;
  height: 40px;
  width: 250px;
  font-size: 16px;
`;

const SignUpButton = styled.button`
    width: 70%;
    height: 2.5rem;
    border: none;
    border-radius: 10px;
    background-color: #9e9e9e;
    color: #ffffff;
    font-weight: 700;
    font-size: 1.1em;
    transition: all 0.5s;
    &:hover,:focus {
      cursor: pointer;
      outline: none;
      transform: scale(1.05);
      background-color: #000;
    }
`;

function SignUp () {
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
    nickname: '',
    password: '',
    passwordCheck: '',
    submit: ''
  });

  const regEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  const regPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/;
  const regNickname = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,10}$/;

  const handleInput = (event: react.FocusEvent<HTMLInputElement>) => {
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

  const handleOnBlur = (event: react.FocusEvent<HTMLInputElement>) => {
    if (event.target.placeholder === 'email') {
      if (regEmail.test(event.target.value)) {
        axios.post(`${apiURL}/user/check`, { email: inputInfo.email }, config)
          .then((res) => {
            console.log(res);
            if (res.data.message === 'email available') {
              setCheckText({ ...checkText, email: '사용 가능한 이메일 입니다.' });
            } else {
              setCheckText({ ...checkText, email: '중복된 이메일 입니다.' });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setCheckText({ ...checkText, email: '잘못된 이메일 형식입니다.' });
      }
    }
    if (event.target.placeholder === 'nickname') {
      if (regNickname.test(event.target.value)) {
        axios
          .post(`${apiURL}/user/check`, { nickname: inputInfo.nickname }, config)
          .then((res) => {
            if (res.data.message === 'nickname available') {
              setCheckText({ ...checkText, nickname: '사용 가능한 닉네임 입니다.' });
            } else {
              setCheckText({ ...checkText, nickname: '중복된 닉네임 입니다.' });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setCheckText({ ...checkText, nickname: '닉네임은 2~10글자 사이로 입력해주세요.' });
      }
    }
    // 두 if 경우 모두
    // axios 성공시
    // axios 실패시
    // 로 나눠서 미리 짜기
  };

  const handlePwBlur = (event: react.FocusEvent<HTMLInputElement>) => {
    if (event.target.placeholder === 'password') {
      if (event.target.value === '') setCheckText({ ...checkText, password: '' });
      else if (regPw.test(event.target.value)) setCheckText({ ...checkText, password: '사용 가능한 비밀번호 입니다.' });
      else setCheckText({ ...checkText, password: '알파벳, 숫자, 특수문자를 포함한 8~15글자를 입력해주세요.' });
    }
    if (event.target.placeholder === 'password check') {
      if (event.target.value === '') setCheckText({ ...checkText, passwordCheck: '' });
      else if (inputInfo.password === event.target.value) setCheckText({ ...checkText, passwordCheck: '비밀번호가 일치합니다.' });
      else setCheckText({ ...checkText, passwordCheck: '비밀번호가 일치하지 않습니다.' });
    }
  };

  const handleSignUp = () => {
    if (
      checkText.email === '사용 가능한 이메일 입니다.' &&
      checkText.nickname === '사용 가능한 닉네임 입니다.' &&
      checkText.password === '사용 가능한 비밀번호 입니다.' &&
      checkText.passwordCheck === '비밀번호가 일치합니다.'
    ) {
      const sendingInfo = {
        email: inputInfo.email,
        nickname: inputInfo.nickname,
        password: inputInfo.password
    }

      axios.post(`${apiURL}/signup`, sendingInfo, config).then((res) => {
        // 로그인창으로 리다이렉트
        navigate('/login');
      }).catch(err => {
        console.log(err);
      });
    } else {
      setCheckText({ ...checkText, submit: '입력사항을 모두 올바르게 입력해주세요.' });
    }
  };

  return (
    <SignUpWrap>
      <SignUpContainer>
        <img src='/images/logodd.png' alt='logo' className='img' />
        <InputWrap>
          <SignUpInput type='email' placeholder='email' onChange={handleInput} onBlur={handleOnBlur} />
          {checkText.email === '사용 가능한 이메일 입니다.'
            ? (
              <span className='green'>{checkText.email}</span>
              )
            : (
              <span>{checkText.email}</span>
              )}
          <SignUpInput type='text' placeholder='nickname' onChange={handleInput} onBlur={handleOnBlur} />
          {checkText.nickname === '사용 가능한 닉네임 입니다.'
            ? (
              <span className='green'>{checkText.nickname}</span>
              )
            : (
              <span>{checkText.nickname}</span>
              )}
          <SignUpInput type='password' placeholder='password' onChange={handleInput} onBlur={handlePwBlur} />
          {checkText.password === '사용 가능한 비밀번호 입니다.'
            ? (
              <span className='green'>{checkText.password}</span>
              )
            : (
              <span>{checkText.password}</span>
              )}
          <SignUpInput type='password' placeholder='password check' onChange={handleInput} onBlur={handlePwBlur} />
          {checkText.passwordCheck === '비밀번호가 일치합니다.'
            ? (
              <span className='green'>{checkText.passwordCheck}</span>
              )
            : (
              <span>{checkText.passwordCheck}</span>
              )}
        </InputWrap>
        <br />
        <SignUpButton onClick={handleSignUp}>Sign Up</SignUpButton>
      </SignUpContainer>
    </SignUpWrap>
  );
}

export default SignUp;
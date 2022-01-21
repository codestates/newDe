import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { actionCreators } from '../store/store';
import { useDispatch } from 'react-redux';

function Login () {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = actionCreators;

  const [inputInfo, setInputInfo] = useState({
    email: '',
    password: ''
  });

  const handleInput = (event) => {
    if (event.target.placeholder === 'email') {
      setInputInfo({ ...inputInfo, email: event.target.value });
    }
    if (event.target.placeholder === 'password') {
      setInputInfo({ ...inputInfo, password: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    if (event.target.className === 'loginBtn') {
      // axios 성공시
      dispatch(login({ email: '응답의 email', nickname: '응답의 nickname' }));
      // axios 실패시
    }
    if (event.target.className === 'oauthBtn') {
      // axios 성공시
      dispatch(login({ email: '응답의 email', nickname: '응답의 nickname' }));
      // axios 실패시
    }
    if (event.target.className === 'signup') {
      navigate('/signup');
    }
  };

  return (
    <div>
      <div>
        <input type='email' placeholder='email' onChange={handleInput} />
      </div>
      <div>
        <input type='password' placeholder='password' onChange={handleInput} />
      </div>
      <button className='loginBtn' onClick={handleSubmit}>Login</button>
      <button className='githubBtn' onClick={handleSubmit}>Github</button>
      <button className='signup' onClick={handleSubmit}>SignUp</button>
    </div>
  );
}

export default Login;

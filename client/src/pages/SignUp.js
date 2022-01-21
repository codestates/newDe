import { useState, useEffect } from 'react';
import axios from 'axios';

function SignUp () {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
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

  const handleInput = (event) => {
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

  const handleOnBlur = (event) => {
    if (event.target.placeholder === 'email') {
      if (regEmail.test(event.target.value)) {
        // axios 성공시

        // axios 실패시

      } else setCheckText({ ...checkText, email: '잘못된 이메일 형식입니다.' });
    }
    if (event.target.placeholder === 'nickname') {
      if (regNickname.test(event.target.value)) {
        // axios 성공시

        // axios 실패시

      } else setCheckText({ ...checkText, nickname: '닉네임은 2~10글자 사이로 입력해 주세요.' });
    }
  };

  const handlePwBlur = (event) => {
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
      const sending = inputInfo;
      delete sending.passwordCheck;
      // axios.post('', sending, config).then((res) => {
      //   //로그인창으로 리다이렉트
      // }).catch(err => {
      //   console.log(err);
      // })
    } else {
      setCheckText({ ...checkText, submit: '입력사항을 모두 올바르게 입력해주세요.' });
    }
  };

  return (
    <div>
      {/* 안쪽 div 다 없애고 CSS로 처리하기 */}
      <div>
        {/* 포커스 아웃 이벤트 발생시 */}
        {/* 요청 보내기 전에 이메일 형식인지 확인 */}
        {/* 요청보내서 중복확인 */}
        <input type='email' placeholder='email' onChange={handleInput} onBlur={handleOnBlur} />
        <div>{checkText.email}</div>
      </div>
      <div>
        {/* 포커스 아웃 이벤트 발생시 */}
        {/* 요청 보내기 전에 글자수, 특수문자 제한 */}
        {/* 요청 보내서 중복확인 */}
        <input type='text' placeholder='nickname' onChange={handleInput} onBlur={handleOnBlur} />
        <div>{checkText.nickname}</div>
      </div>
      <div>
        {/* 포커스 아웃 이벤트 발생시 */}
        {/* 알파벳, 숫자, 특수문자 포함 8~15글자 사이로 */}
        <input type='password' placeholder='password' onChange={handleInput} onBlur={handlePwBlur} />
        <div>{checkText.password}</div>
      </div>
      <div>
        {/* 포커스 아웃 이벤트 발생시 */}
        {/* 위에꺼랑 같은지 비교 */}
        <input type='password' placeholder='password check' onChange={handleInput} onBlur={handlePwBlur} />
        <div>{checkText.passwordCheck}</div>
      </div>
      {/* 성공시 로그인 리다이렉트 */}
      <button onClick={handleSignUp}>Sign Up</button>
      <div>{checkText.submit}</div>
    </div>
  );
}

export default SignUp;

// 1. 중복확인 요청해서 받기
// 2. 가입 요청 보내기 서버에러 발생시 '잠시 후 다시시도해 주세요' 같은거 버튼 밑에 띄우기
// 3. 성공시 로그인 페이지로 리다이렉트

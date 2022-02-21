import axios from 'axios';


function MyPageEdit () {


  
    return (
        <div>
            <div>이메일</div>
            <input type='email' placeholder='email' disabled />
            <div>변경할 닉네임</div>
            <input type='text' placeholder='nickname' />
            <div>기존 비밀번호</div>
            <input type='password' placeholder='password' />
            <div>변경할 비밀번호</div>
            <input type='password' placeholder='password' />
            <div>비밀번호 확인</div>
            <input type='password' placeholder='password' />
        </div>
    );
  }

export default MyPageEdit

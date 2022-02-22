import axios from 'axios';
import {URL} from '../url'

function MyPageEdit () {

    async function fatchData (){
        const result = await axios.patch(`${URL}/`)
    }
  
    return (
        <div>
            <div>이메일</div>
            <input type='email' placeholder='email' disabled />
            <div>변경할 닉네임</div>
            <input type='text' placeholder='nickname' />
            <div>변경할 비밀번호</div>
            <input type='password' placeholder='password' />
            <div>비밀번호 확인</div>
            <input type='password' placeholder='password' />
        </div>
    );
  }

export default MyPageEdit

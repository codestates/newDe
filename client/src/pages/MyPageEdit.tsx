import axios from 'axios';
import { apiURL } from '../url'
import { useState } from 'react'
import Loader from '../component/Loader'
import { text } from 'stream/consumers';
import { useNavigate } from 'react-router-dom';


function MyPageEdit() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const [checkInfo, setCheckInfo] = useState({
        nickname: '',
        password: '',
        checkPassword: ''
    })
    const [text, setText] = useState({
        nickname: '',
        password: '',
        checkPassword: ''
    })
    const config = {
        headers: { "Content-type": "application/json" },
        withCredentials: true
    }
    const onChange = (e: any) => {
        if (e.target.placeholder === 'nickname') {
            setCheckInfo({ ...checkInfo, nickname: e.target.value })
        }
        if (e.target.placeholder === 'password') {
            setCheckInfo({ ...checkInfo, password: e.target.value })
        }
        if (e.target.placeholder === 'checkPassword') {
            setCheckInfo({ ...checkInfo, checkPassword: e.target.value })
        }
    }
    const regNickname = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,10}$/
    const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,20}/

    const handleOnBlur = (e: any) => {
        if (e.target.placeholder === 'nickname') {
            if (regNickname.test(e.target.value)) {
                axios.post(`${apiURL}/user/check`, { nickname: checkInfo.nickname }, config)
                    .then(res => {
                        if (res.data.message === 'nickname already exisits') {
                            setText({ ...text, nickname: '중복된 닉네임 입니다' })
                        } else {
                            setText({ ...text, nickname: '사용가능한 닉네임 입니다' })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
            }
            else {
                setText({ ...text, nickname: '닉네임은 2~10글자 사이로 입력해주세요.' })
            }
        }
        if (e.target.placeholder === 'password') {
            if (regPassword.test(e.target.value)) {
                setText({ ...text, password: '사용가능한 비밀번호 입니다' })
            } else {
                setText({ ...text, password: '6~20자 사이의 최소 하나의 특수문자,대문자가 포함되어야 합니다' })
            }
        }
        if (e.target.placeholder === 'checkPassword') {
            if (checkInfo.password === checkInfo.checkPassword) {
                setText({ ...text, checkPassword: '비밀번호가 일치합니다' })
            } else {
                setText({ ...text, checkPassword: '비밀번호가 일치하지 않습니다' })
            }
        }
    }

    async function fatchData() {
        if (text.nickname === '사용가능한 닉네임 입니다' || text.checkPassword === '비밀번호가 일치합니다') { // fix please
            if (text.nickname) {
                try {
                    setLoading(true)
                    await axios.patch(`${apiURL}/user`, { nickname: checkInfo.nickname }, config)
                    .then(res=>{
                        setLoading(false)
                        
                    })
                } catch (err) {
                    console.log(err)
                }
            }
            if (text.checkPassword) {
                try {
                    setLoading(true)
                    await axios.patch(`${apiURL}/user`, { password: checkInfo.checkPassword }, config)
                    .then(res=>{
                        setLoading(false)
                    })
                } catch (err) {
                    console.log(err)
                }
            }
            if(checkInfo.nickname===''&& checkInfo.password===''&&checkInfo.checkPassword===''){
                alert('수정할 내용이 없습니다')
            }else{
                alert('수정 완료!')
            }
        }
    }
    console.log(text)
    if (loading) return <Loader type="spin" color="#999999" />

    return (
        <div>
            <div>이메일</div>
            <input type='email' placeholder='email' disabled />
            <div>변경할 닉네임</div>
            <input type='text' placeholder='nickname' value={checkInfo.nickname} onChange={onChange} onBlur={handleOnBlur} />
            <div>{text.nickname}</div>
            <div>변경할 비밀번호</div>
            <input type='password' placeholder='password' value={checkInfo.password} onChange={onChange} onBlur={handleOnBlur} />
            <div>{text.password}</div>
            <div>비밀번호 확인</div>
            <input type='password' placeholder='checkPassword' value={checkInfo.checkPassword} onChange={onChange} onBlur={handleOnBlur} />
            <div>{text.checkPassword}</div>
            <button onClick={fatchData}>수정 완료</button>
            <button onClick={()=> navigate('/mypage')}>수정 취소</button>
        </div>
    );
}

export default MyPageEdit

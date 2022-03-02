import { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../component/Loader'
import { apiURL } from '../url'
import Edit from '../component/editPassword'
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import styled from 'styled-components';

const Hi = styled.div`
    margin-top: 100px;
`

function MyPage() {
    const [userInfo, setUserInfo] = useState<any>({})
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [checkText, setCheckText] = useState('')
    const [text, setText] = useState('')
    const [content,setContent] = useState<any>([])
    const isOauth = useAppSelector((state: RootState) => state.info.oauth)
    

    const navigate = useNavigate();
    const handleModal = () => {
        if(isOauth){
            navigate('/mypageedit')
        } else{
            setIsOpen(!isOpen);
        }
    };

    const config = {
        headers: { "Content-type": "application/json" },
        withCredentials: true
    }
    const onChange = (e: any) => {
        setText(e.target.value)
    }
    async function passwordCheck() {
        try {
            setLoading(true)
            const res = await axios.post(`${apiURL}/user/check`, { password: text }, config)
            if (res.data.message === 'password correct!') {
                navigate('/mypageedit')
            } else {
                setCheckText('wrong password')
            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }


    async function fetchData() {
        try {
            setLoading(true)
            const res = await axios.get(`${apiURL}/user`, { withCredentials: true })
            console.log(res.data.data)
            setUserInfo(res.data.data)
            setContent(res.data.data.content)
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
        return ()=> {
            setIsOpen(false)
            setLoading(false)
        }
    }, [])

    if (loading) return <Loader type="spin" color="#999999" />
    return (
        <Hi>
            <div>
                <div>{userInfo.nickName}</div>
                <button type='button' onClick={handleModal}>modal open</button>
                <Edit visible={isOpen} onClose={handleModal}>
                    <div>current password</div>
                    <input type='password' placeholder='current password' onChange={onChange} value={text}></input>
                    <span><button onClick={passwordCheck}>submit</button></span>
                    <div>{checkText}</div>
                </Edit>
            </div>
            <div>
                {content.map((el:any,index:number)=>
                <div key={index}>
                    <div>title : {el.title}</div>    
                    <div><span>main : </span><span dangerouslySetInnerHTML={{__html:el.main}}></span></div>
                </div>)}
            </div>
        </Hi>
    )
}

export default MyPage;

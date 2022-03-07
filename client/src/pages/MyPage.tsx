import { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../component/Loader'
import { apiURL } from '../url'
import Edit from '../component/editPassword'
import { useNavigate } from 'react-router-dom';
import { PageNav, DropoutModal} from '../component';
import { RootState } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import styled from 'styled-components';


const MyPageWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width:100%;
    margin-top: 100px;
    .btn{
        cursor: pointer;
    }
`

const MyInfo = styled.div`
    margin: 50px 50px 50px 50px;
    
`

const MyContents = styled.div`
    
    margin: 50px 50px 50px 50px;

`
const BtnWrap = styled.div`
    margin: 2%;
`

const PageNavWrap = styled.div`
    
    width: 50%;
`
function MyPage() {
    const [userInfo, setUserInfo] = useState<any>({})
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [checkText, setCheckText] = useState('')
    const [text, setText] = useState('')
    const [content,setContent] = useState<any>([])
    const isOauth = useAppSelector((state: RootState) => state.info.oauth)
    const [maxpage, setmax] = useState(1)
    const [nowpage, setpage] = useState(1)
    const [dropoutmodal, setdrop] =useState(false)
    const [isalertopened, setAlert] = useState(false)


    const navigate = useNavigate();
    const handleModal = () => {
        if(isOauth){
            navigate('/mypageedit')
        } else{
            setIsOpen(!isOpen);
        }
    };

    const handleDropout = () => {
        setdrop(!dropoutmodal)
    }

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

    async function passwordCheckforDropout() {
        try {
            setdrop(false)
            setLoading(true)
            const res = await axios.post(`${apiURL}/user/check`, { password: text }, config)
            if (res.data.message === 'password correct!') {
                setAlert(true)
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
            const userInfo = {...res.data.data};
            delete userInfo.content;
            // console.log(res.data.data)
            setUserInfo(userInfo)
            setContent(res.data.data.content)
            setmax(Math.ceil((content.length)/10))
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }

    const handlePage = (el:number) => {
        setpage(el)
    }
    const clickhandler = (el:string) =>{
        navigate(`/${el}`)
    }
    const dropouthandler = () => {
        setAlert(false)
    }

    useEffect(() => {
        fetchData()
        return ()=> {
            setIsOpen(false)
            setLoading(false)
        }
    }, [maxpage])

    if (loading) return <Loader type="spin" color="#999999" />
    return (
        <MyPageWrap>
            {isalertopened ? <DropoutModal modalhandler = {dropouthandler} />: null}
            <MyInfo>
                <div>내정보</div>
                <div>이메일:{userInfo.email}</div>
                <div>닉네임:{userInfo.nickname}</div>
                <div>가입유형:{userInfo.kakao? '카카오': '일반'}</div>
                <BtnWrap>                    
                    <button type='button' onClick={handleModal}>정보 수정</button>
                    <Edit visible={isOpen} onClose={handleModal}>
                        <div>current password</div>
                        <input type='password' placeholder='current password' onChange={onChange} value={text}></input>
                        <span><button onClick={passwordCheck}>submit</button></span>
                        <div>{checkText}</div>
                    </Edit>
                </BtnWrap>
                <BtnWrap>                    
                    <button type='button' onClick={handleDropout}>회원 탈퇴</button>
                    <Edit visible={dropoutmodal} onClose={handleDropout}>
                        <div>current password</div>
                        <input type='password' placeholder='current password' onChange={onChange} value={text}></input>
                        <span><button onClick={passwordCheckforDropout}>submit</button></span>
                        <div>{checkText}</div>
                    </Edit>
                </BtnWrap>
                

            </MyInfo>      
            
            <MyContents>   
                <div>
                    내가 쓴 글
                </div>
                <div>
                    {content.slice(10*(nowpage-1), 10*nowpage).map((el:any,index:number)=>
                    
                    <div key={index}>
                        <div className = 'btn' onClick = {() => clickhandler(el.id)}>title : {el.title}</div>    
                        
                        <div> {new Date(el.createdAt).getFullYear()}년 {new Date(el.createdAt).getMonth() + 1}월 {new Date(el.createdAt).getDate()}일</div>
                        {/* <div><span>main : </span><span dangerouslySetInnerHTML={{__html:el.main}}></span></div> */}
                    </div>)}
                </div>   
                <PageNavWrap>
                    <PageNav maxpage = {maxpage} nowpage = {nowpage} pagehandler = {handlePage} /> 
                </PageNavWrap>
                
            </MyContents>   
            
        </MyPageWrap>
    )
}

export default MyPage;

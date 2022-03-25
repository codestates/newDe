import Loader from '../component/Loader'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { apiURL } from '../url'
import axios from 'axios'
import { RootState } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { useState } from 'react';
import { setLogin } from '../features/info';
import { AlertModal} from '../component';

function Callback():JSX.Element {
    const week = ['일', '월', '화', '수', '목', '금', '토']

    const [loading, setLoading] = useState(false);
    const [alertOpened, setAlert] = useState('false')
    const [alertMessage, setMessage] = useState('')
    function alerthandler () {
        setAlert('returned')
    }

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect( () => {
        
        setLoading(true)
        const url = new URL(window.location.href);

        const login = url.searchParams.get('islogin')
        const isbanned = url.searchParams.get('ban')
        if(login === 'success') {
            
            dispatch(setLogin(true))
            
            navigate('/MyPage')
            }

        if(isbanned){
            
            // const timebanned = isbanned.split(' '); //['Thu', 'Mar', '03', '2022', '13:56:43', 'GMT+0900', '(Korean', 'Standard', 'Time']
            const timebanned = new Date(isbanned)
            // console.log(timebanned)
            // console.log(timearr)
            // const [dayofweek, month, day, year, time] = timebanned
            setMessage(`${timebanned.getFullYear()}년 ${timebanned.getMonth()+1}월 ${timebanned.getDate()}일 ${week[timebanned.getDay()]}요일까지 차단된 계정입니다.`)
            setAlert('true')
            // navigate('/')
            if(alertOpened === 'returned'){
                navigate('/')
            }
            // setTimeout(()=> navigate('/'), 1000)
        }
        
        
    }, [alertOpened])

    return (
        <div>
            {loading ? <Loader type="spin" color="#999999" /> : '콜백화면입니다.'}
            {alertOpened === 'true' ? <AlertModal message = {alertMessage} modalhandler = {alerthandler} />: null}
        </div>
    )        
}

export default Callback
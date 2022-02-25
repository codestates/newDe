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

function Callback(props:any):JSX.Element {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect( () => {
        // console.log(props)
        setLoading(true)
        const url = new URL(window.location.href);

        const login = url.searchParams.get('islogin')
        if(login === 'success') {
            // console.log(setLogin(true))
            // console.log(props.loginhandler)
            // props.loginhandler()
            dispatch(setLogin(true))
            
            navigate('/MyPage')
            }
        
        
    }, [])

    return (
        <div>
            {loading ? <Loader type="spin" color="#999999" /> : '콜백화면입니다.'}
        </div>
    )        
}

export default Callback
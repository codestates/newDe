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
        
        setLoading(true)
        const url = new URL(window.location.href);

        const login = url.searchParams.get('islogin')
        const isbanned = url.searchParams.get('isbanned')
        if(login === 'success') {
            
            dispatch(setLogin(true))
            
            navigate('/MyPage')
            }

        if(isbanned === 'true'){
            alert("차단된 유저입니다.")
            navigate('/')
        }
        
        
    }, [])

    return (
        <div>
            {loading ? <Loader type="spin" color="#999999" /> : '콜백화면입니다.'}
        </div>
    )        
}

export default Callback
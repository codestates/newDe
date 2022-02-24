import Loader from '../component/Loader'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../url'
import axios from 'axios'
import { useState } from 'react';

function Callback(props:any):JSX.Element {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    useEffect( () => {
        setLoading(true)
        const url = new URL(window.location.href);

        const authorizationCode = url.searchParams.get('code')
        if(authorizationCode) {
            axios.post(`${apiURL}/oauth`, { authorizationCode }, { withCredentials: true } )
            .then( () => {
                props.loginhandler()
                setLoading(false)
                navigate('/mypage')

            })
        }
        
    }, [])

    return (
        <div>
            {loading ? <Loader type="spin" color="#999999" /> : '콜백화면입니다.'}
        </div>
    )        
}

export default Callback
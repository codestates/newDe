import { useEffect, useState } from 'react'
import axios from 'axios'
import { RootState } from '../store'
import { useAppSelector } from '../store/hooks'
import Loader from '../component/Loader'


function MyPage() {
    const [userInfo, setUserInfo] = useState<any>({})
    const [loading, setLoading] = useState(false)
    const URL = useAppSelector((state: RootState) => state.url.url)

    async function fetchData() {
        try {
            setLoading(true)
            const result = await axios.get(`${URL}/users`, { withCredentials: true })
            setUserInfo(result.data.data)
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) return <Loader type="spin" color="#999999" />
    return (
        <div>
            <div>
                <div>{userInfo.nickName}</div>
            </div>
        </div>
    )
}

export default MyPage;

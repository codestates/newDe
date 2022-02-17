import {useEffect,useState} from 'react'
import axios from 'axios'
import { RootState } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { amount, decrement, increment } from '../features/counter'

function MyPage(){
    const [userId,setUserId] = useState('2')
    const [test,setTest]= useState('')
    const URL:string='http://localhost:8080'

    useEffect(()=>{
        async function fetchData() {
            const result = await axios.get(`${URL}/user/${userId}`)
            console.log(result.data.data[0].main)
            setTest(result.data.data[0].main)
        }
        fetchData()
    },[])
    const count = useAppSelector((state: RootState) => state.count.value)
    const id = useAppSelector((state: RootState) => state.count.id)
    const dispatch = useAppDispatch()
    return (
        <div>
            {test}
            <div>
                <button onClick={()=>dispatch(increment())}>Increment</button>
                <button onClick={()=>dispatch(decrement())}>Decrement</button>
                <button onClick={()=>dispatch(amount({id:2,value:2}))}>id change</button>
                <div>{count}</div>
                <div>{id}</div>
            </div>
        </div>
    )
}

export default MyPage;


// {data: {
// id, 
// nickname, 
// email, 
// jointype, 
// status, 
// createdAt, 
// updatedAt, 
// content : 
// [{id, parentCategory, childCategory, title, nickname, replyCount, like, createdAt }, 
// {id, parentCategory, childCategory, title, nickname, replyCount, like, createdAt }
// ]},
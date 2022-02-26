import {useState, useEffect} from 'react'
import axios from 'axios'
import {apiURL} from '../url'
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'


const MainContainer = styled.div`
display: flex;
position: absolute;
background : #F3F3F3;
width: 100%;
height: 100%;
text-align: center;
align-items: center;
justify-content: center;
`

const BoardWrap = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 80%;
background: yellow;

@media ${(props)=> props.theme.mobile}{
    width: 100%;
    height: 100%;

}


`

const ReportedContentWrap = styled.div`
width: 90%;
background: red;
`
const ReportedSec = styled.div`
display: flex;
background: papayawhip;
`
const NameSec = styled.div`
width: 70%;
background: pink;
cursor:pointer;`
const UserSec = styled.div`
width: 10%;
background: violet;`

const ManageBtn = styled.button`
` 

function Admin(): JSX.Element {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
      };
    const navigate = useNavigate();

    const [reportedCon, setReportedCon] = useState([]);
    const [reportedComment, setReportedComment] = useState([]);
    const [penalty, setPenalty] = useState('')
    const [restnum, setNum] = useState(0)

    const getReported = async () => {
        const reportedresult = await axios.get(`${apiURL}/report/board`, config)
        console.log(reportedresult.data.data)
        setReportedCon(reportedresult.data.data)




    }

    useEffect(()=>{
        getReported()

    }, [])
    
    const dummy = [1,2,3,4,5];
    const handleClickTitle = (el: string) => {
        navigate(`../${el}`)

    }

    const handleDropDown = (event:React.ChangeEvent<HTMLSelectElement>) => {

        // console.log(event.target.value)
        setPenalty(event.target.value)
    }

    const handlePanalty = () => {
        if(penalty === '혐의없음'){
            //해당 글, 댓글의 신고된 횟수만 0으로 만들고 종료, 
        }

        else if(penalty === '글삭제'||'댓글삭제'){
            //해당 글, 댓글만 삭제함 axios delete board/:contentId 사용하면 됨 
        }
        
        else if(penalty === '7일정지'){
            //여기서부턴 글 댓글 삭제와 함께 patch 로 패널티 기간 발송 

        }
        else if(penalty === '30일정지'){

        }
        else if(penalty === '1년정지'){

        }
        else {
            console.log('something wrong!!')
        }


    }
    const contentToList = reportedCon.map((el:any) => {
        return (
            <ReportedSec key = {el.id}>
                <NameSec onClick = {()=> handleClickTitle(el.id)}>{el.title}</NameSec>
                <UserSec>{el.userId}</UserSec>
                <select onChange = {handleDropDown}>
                    <option value = '혐의없음'>혐의없음</option>
                    <option value = '글삭제'>글만삭제</option>
                    <option value = '7일정지'>7일정지</option>
                    <option value = '30일정지'>30일정지</option>
                    <option value = '1년정지'>1년정지</option>
                </select>
                <ManageBtn onClick = {handlePanalty}>처리하기</ManageBtn>
                
            </ReportedSec>

        )

    })

    const commentToList = dummy.map((el:any) => {
        return (
            <div key = {el}>
                <span>댓글내용</span>
                <span>댓쓴이</span>
                
            </div>

        )

    })
    
    return (
        <MainContainer>
            <BoardWrap>
                <ReportedContentWrap>
                    <div>신고된 글</div>
                    {contentToList}
                    
                </ReportedContentWrap>
                <ReportedContentWrap>
                    <div>신고된 댓글</div>
                    {commentToList}
                </ReportedContentWrap>
            </BoardWrap>
        </MainContainer>

    )
}

export default Admin;
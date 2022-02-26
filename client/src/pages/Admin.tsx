import {useState, useEffect} from 'react'
import axios from 'axios'
import {apiURL} from '../url'
import styled from 'styled-components';


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
background: pink;`
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

    const [reportedCon, setReportedCon] = useState([]);
    const [reportedComment, setReportedComment] = useState([]);

    const getReported = async () => {
        const reportedresult = await axios.get(`${apiURL}/report/board`, config)
        console.log(reportedresult.data.data)
        setReportedCon(reportedresult.data.data)




    }

    useEffect(()=>{
        getReported()

    }, [])
    
    const dummy = [1,2,3,4,5]
    const contentToList = reportedCon.map((el:any) => {
        return (
            <ReportedSec key = {el.id}>
                <NameSec>{el.title}</NameSec>
                <UserSec>{el.userId}</UserSec>
                <ManageBtn>처리하기</ManageBtn>
                
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
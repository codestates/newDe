import {useState, useEffect} from 'react'
import axios from 'axios'
import {apiURL} from '../url'
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
import { stringify } from 'querystring';


const MainContainer = styled.div`
display: flex;
position: absolute;
background : #F3F3F3;
width: 100%;
height: 100%;
text-align: center;
align-items: center;
justify-content: center;
flex-direction: column;

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
        // console.log(reportedresult.data.data)
        setReportedCon(reportedresult.data.data)




    }
    const getReportedComment = async () => {
        const reportedcommentresult = await axios.get(`${apiURL}/report/comment`, config)
        // console.log(reportedcommentresult.data.data)
        setReportedComment(reportedcommentresult.data.data)




    }

    
    useEffect(()=>{
        getReported()
        getReportedComment()
        setNum(reportedCon.length+reportedComment.length)
        
    }, [restnum])
    
    // const dummy = [1,2,3,4,5];
    const handleClickTitle = (el: string) => {
        navigate(`../${el}`)

    }

    const handleDropDown = (event:React.ChangeEvent<HTMLSelectElement>) => {

        // console.log(event.target.value)
        setPenalty(event.target.value)
    }

    const handlePanalty = (user:string, contentid : string) => {
        if(penalty === '혐의없음'){
            //해당 글의 신고된 횟수만 0으로 만들고 종료, 
            
            axios.patch(`${apiURL}/board/report`, {contentId: contentid, initialrize: true}, config)
            .then(el => setNum(restnum -1 ))
            .then(el => alert('처리되었습니다.'))
            
            
            
        }
        
        else if(penalty === '글삭제'){
            //해당 글만 삭제함 axios delete board/:contentId 사용하면 됨 
            axios.delete(`${apiURL}/board/${contentid}`, config)
            .then(el => setNum(restnum -1 ))
            .then(el=>alert("삭제되었습니다"))
            
            //댓글이 있는 글은 현재 삭제가 안됨, 수정 필요 및 admin 유저는 모든 글을 삭제할 수 있도록 변경해야함 
            
        }
        
        
        else if(penalty === '7일정지'){
            //여기서부턴 글 댓글 삭제와 함께 patch 로 패널티 기간 발송 
            // console.log(user)
            axios.patch(`${apiURL}/report`, {userId: user, penalty: 7}, config)
            .then(el => {
                axios.delete(`${apiURL}/board/${contentid}`, config)
            })
            .then(el => setNum(restnum -1 ))
            .then(el => alert('처리되었습니다.'))

        }
        else if(penalty === '30일정지'){

            axios.patch(`${apiURL}/report`, {userId: user, penalty: 30}, config)
            .then(el => {
                axios.delete(`${apiURL}/board/${contentid}`, config)
            })
            .then(el => setNum(restnum -1 ))
            .then(el => alert('처리되었습니다.'))

        }
        else if(penalty === '1년정지'){
            axios.patch(`${apiURL}/report`, {userId: user, penalty: 365}, config)
            .then(el => {
                axios.delete(`${apiURL}/board/${contentid}`, config)
            })
            .then(el => setNum(restnum -1 ))
            .then(el => alert('처리되었습니다.'))

        }
        else {
            console.log('something wrong!!')
        }


    }

    
    const handleCommentPanalty = (user:string, commentid : string) => {
        if(penalty === '혐의없음'){
            //해당 글의 신고된 횟수만 0으로 만들고 종료, 
            axios.patch(`${apiURL}/comment/report`, {commentId: commentid, initialrize: true}, config)
            .then(el => setNum(restnum -1 ))
            .then(el => alert('처리되었습니다.'))
            
        }
        
        else if(penalty === '댓글삭제'){
            //해당 글만 삭제함 axios delete board/:contentId 사용하면 됨 
            axios.delete(`${apiURL}/comment/${commentid}`, config)
            .then(el => setNum(restnum -1 ))
            .then(el=>alert("삭제되었습니다"))
        }
        
        
        else if(penalty === '7일정지'){
            //여기서부턴 글 댓글 삭제와 함께 patch 로 패널티 기간 발송 
            axios.patch(`${apiURL}/report`, {userId: user, penalty: 7}, config)
            .then(el => {
                axios.delete(`${apiURL}/comment/${commentid}`, config)
            })
            .then(el => setNum(restnum -1 ))
            .then(el => alert('처리되었습니다.'))
        }
        else if(penalty === '30일정지'){
            axios.patch(`${apiURL}/report`, {userId: user, penalty: 30}, config)
            .then(el => {
                axios.delete(`${apiURL}/comment/${commentid}`, config)
            })
            .then(el => setNum(restnum -1 ))
            .then(el => alert('처리되었습니다.'))

        }
        else if(penalty === '1년정지'){
            axios.patch(`${apiURL}/report`, {userId: user, penalty: 365}, config)
            .then(el => {
                axios.delete(`${apiURL}/comment/${commentid}`, config)
            })
            .then(el => setNum(restnum -1 ))
            .then(el => alert('처리되었습니다.'))

        }
        else {
            console.log('something wrong!!')
        }


    }


    const contentToList = reportedCon.map((el:any) => {
        return (
            <ReportedSec key = {el.id}>
                <NameSec onClick = {()=> handleClickTitle(el.id)}>{el.title}</NameSec>
                <UserSec>{el.user.nickname}</UserSec>
                <select onChange = {handleDropDown}>
                    <option value = '선택하세요'>...</option>
                    <option value = '혐의없음'>혐의없음</option>
                    <option value = '글삭제'>글삭제</option>
                    <option value = '7일정지'>7일정지</option>
                    <option value = '30일정지'>30일정지</option>
                    <option value = '1년정지'>1년정지</option>
                </select>
                <ManageBtn onClick = {()=> handlePanalty(el.userId, el.id)}>처리하기</ManageBtn>
                
            </ReportedSec>

        )

    })

    const commentToList = reportedComment.map((el:any) => {
        return (
            <ReportedSec key = {el.id}>
                <NameSec onClick = {()=> handleClickTitle(el.contentId)}>{el.main}</NameSec>
                <UserSec>{el.user.nickname}</UserSec>
                <select onChange = {handleDropDown}>
                    <option value = '선택하세요'>...</option>
                    <option value = '혐의없음'>혐의없음</option>
                    <option value = '댓글삭제'>댓글삭제</option>
                    <option value = '7일정지'>7일정지</option>
                    <option value = '30일정지'>30일정지</option>
                    <option value = '1년정지'>1년정지</option>
                </select>
                <ManageBtn onClick = {() => handleCommentPanalty(el.userId, el.id)}>처리하기</ManageBtn>
                
            </ReportedSec>

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
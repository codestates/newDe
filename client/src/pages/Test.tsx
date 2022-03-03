import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'


const MainContainer = styled.div`
margin-top: 7%;
display: flex;
text-align: center;
flex-direction: column;
background : white;
width: 100%;
.btn {
    text-decoration-line: none;
    color: #34495E;
    &:hover {
      cursor: pointer;
      outline: none;
      color: black;
    }
}`
const ConWrap = styled.div`
display: flex;
justify-content:center;

`
const NumberingSec = styled.div`
margin-right: 0.5%;

`

const QuestionSec = styled.div`
font-size: 200%;
`
const ResultSec = styled.div`
font-size: 300%;
`
const BtnWrap = styled.div`
display: flex;
justify-content: center;
`
const SelectBtn = styled.button`
font-size: 200%;
margin: 5%;
`
const Question = [
    [1, '보기좋은 떡이 맛도 좋다는 말에 동의한다 ','Yes','No'],
    [2, '모로가도 서울만 가면 된다는 말에 동의한다.','Yes','No']
]

const Result = ['백엔드', '풀스택', '프론트엔드']




function Test(): JSX.Element {
    const navigate = useNavigate()
    const isLogin = useAppSelector((state: RootState) => state.info.login)

    const [nowQ, setQ] = useState(1)
    const [score, setScore] = useState(0)
    const [nextisQ, setNext] = useState(true)
    
    const leftbtnclickhandler = () => {
        if(nowQ === 1){
            setScore(score +1)
            setQ(nowQ+1)
        }
        else {
            setScore(score -1)
            setNext(false)
        }
        
        
    
    }
    const rightbtnclickhandler = () =>{
        if(nowQ === 1){
            setScore(score -1 )
            setQ(nowQ+1)
        }
        else {
            setScore(score +1)
            setNext(false)
        }
        
        

    }
    const handleroadmap = () =>{
        if(isLogin){
            navigate('../mainboard')
        }
        else{
            navigate('../login')
        }
        
    }
    return (
        <MainContainer>
            {nextisQ ? 
            
            <MainContainer>
            <ConWrap>
                <NumberingSec>Q{nowQ}. </NumberingSec>
                <QuestionSec>
                {Question[nowQ-1][1]}
                </QuestionSec>
            </ConWrap> 
            
            
            <BtnWrap>
                <SelectBtn onClick = {leftbtnclickhandler}>
                    {Question[nowQ-1][2]}
                </SelectBtn>
                <SelectBtn onClick = {rightbtnclickhandler}>
                    {Question[nowQ-1][3]}
                </SelectBtn>
            </BtnWrap>
    
        </MainContainer> : 
        <MainContainer>
            <ConWrap>
                <ResultSec>
                    당신은 {Result[score/2+1]} 입니다.
                </ResultSec>
                
            </ConWrap>
                
            
            <BtnWrap>
                <SelectBtn onClick = {handleroadmap}>더 많은 정보 알아보기</SelectBtn>
            </BtnWrap>
            
        </MainContainer>

        }
        </MainContainer>
        
    
    )
}
export default Test

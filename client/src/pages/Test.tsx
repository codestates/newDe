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
const Question:[number, string, string, string, string][] = [
    [1, '보기좋은 떡이 맛도 좋다.','Yes','No', 'src'],
    [2, '계획대로만 진행하기 보다는 유동적인 것이 좋다.','Yes','No', 'src'],
    [3, '더 좋아하는 게임은?', '실력뿐 아니라 운도 중요한 게임', '실력이 중요한 게임', 'src'],
    [4, '전통을 지키는 것은?', '중요하지 않다.', '필요하다', 'src'],
    [5, '친구를 만날때는? ', '30분전에 약속을 잡는다', '이주일 전에 약속을 잡는다', 'src'],
    [6, '좋아하는 소설은?', '판타지 소설', '추리 소설', 'src'],
    [7, '결과가 바로 보이는게 좋다', 'Yes', 'No', 'src']

]

const Result = [ '누가봐도 백엔드', '감성적인 백엔드','배려심 많은 프론트엔드', '인싸 프론트엔드'  ]




function Test(): JSX.Element {
    const navigate = useNavigate()
    const isLogin = useAppSelector((state: RootState) => state.info.login)

    const [nowQ, setQ] = useState(1)
    const [score, setScore] = useState(0)
    const [nextisQ, setNext] = useState(true)
    
    const leftbtnclickhandler = () => {
        setScore(score +1)
        if(nowQ >= 7){
            setNext(false)
        }
        else{
            setQ(nowQ+1)
        }
        
        
    
    }
    const rightbtnclickhandler = () =>{
        if(nowQ >= 7){
            setNext(false)
        }
        else{
            setQ(nowQ+1)
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
                    당신은 {Result[Math.floor(score/2)]} 입니다.
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

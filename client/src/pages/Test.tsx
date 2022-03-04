/* eslint-disable jsx-a11y/alt-text */
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import test2 from '../images/test2.jpeg'
import test3 from '../images/test3.png'
import test4 from '../images/test4.png'
import test6 from '../images/test6.png'
import plus from '../images/plus.png'
import gasu from '../images/gasu.png'
import promise from '../images/promise.png'
import aya from '../images/aya.png'


const MainContainer = styled.div`
margin-top: 5%;
display: flex;
text-align: center;
flex-direction: column;
background : white;
width: 100%;
height: 100%;
@media ${(props)=> props.theme.mobile}{
    margin-top: 13%;
}
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

const ImgWrap = styled.div`
margin: 15px 0 15px 0;
 > img {
     height: 400px;
     width: 500px;
     @media ${(props)=> props.theme.mobile}{
     width: 100%;
}
 }
 
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
border: none;
background-color: white;
font-size: 20px;
font-size: 200%;
margin: 0 50px 0 50px;

&:hover {
      cursor: pointer;
      outline: none;
      transform: scale(1.05);
      color: red;
    }
`
const Question:[number, string, string, string, string][] = [
    [1, '계획대로만 진행하기 보다는 유동적인 것이 좋다.','Yes','No', test2],
    [2, '기능만 돌아가면 된다', '아니다', '그렇다', test3],
    [3, '겉보다 속이 중요하다', '겉이 중요하다', '내면이 중요하다', test4],
    [4, '1+1=?','귀요미','2', plus],
    [5, '전통을 지키는 것은?', '중요하지 않다.', '필요하다', test6],
    [6, '처음 보는 게임을 플레이 하려 한다. 이때', '일단 키고 맞아본다.', '공략을 킨다.', aya],
    [7, '당신은 지금 친구를 불러 점심을 먹으려 하고 있다. 이때 당신은', '친구를 지금 부른다', '어제 불러놨다.', promise],
    [8, '밴드를 결성하기로 했다. 당신의 포지션은?','보컬','연주자', gasu]
]

const Result = ['누가봐도 백엔드', '감성적인 백엔드','중원의 지휘자 풀스택','배려심 많은 프론트엔드', '인싸 프론트엔드']






function Test(): JSX.Element {
    const navigate = useNavigate()
    const isLogin = useAppSelector((state: RootState) => state.info.login)

    const [nowQ, setQ] = useState(1)
    const [score, setScore] = useState(0)
    const [nextisQ, setNext] = useState(true)

    let targetResult;

    if(score < 2) {
        targetResult = 0
    } else if (score < 4) {
        targetResult = 1
    } else if (score === 4) {
        targetResult = 2
    } else if (score < 7) {
        targetResult = 3
    } else {
        targetResult = 4
    }
    
    const leftbtnclickhandler = () => {
        setScore(score +1)
        if(nowQ >= 8){
            setNext(false)
        }
        else{
            setQ(nowQ+1)
        }
        
        
    
    }
    const rightbtnclickhandler = () =>{
        if(nowQ >= 8){
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
            
            <ImgWrap>
                <img src={Question[nowQ-1][4]} alt='test' />
            </ImgWrap>
            
            <BtnWrap>
                <SelectBtn onClick = {leftbtnclickhandler} className='leftBtn'>
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
                    당신은 {Result[targetResult]} 입니다.
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

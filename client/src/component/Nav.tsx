import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import {AiOutlineMenu} from 'react-icons/ai'


let isLogin = false //나중에 props나 redux등으로 받을것 
let menuopened = true //위와 동일

const Navi = styled.header`
    
    width: 100%;
    height: 70px;
    background: #F3F3F3;

    @media ${(props)=> props.theme.mobile}{
        width: 100%;
        
    }
    
    
    
`

const MenubarBtn = styled.div`
margin: 20px;
margin-top: 10px;
width: 50px;
align-items: center;




`
const NavWrap = styled.div`
display: flex;

align-items: center;
justify-content: center;

margin: 2px ;
.btn {
    text-decoration-line: none;
    color: #34495E;
    &:hover {
      cursor: pointer;
      outline: none;
      color: black;
    }`


const LeftSection = styled.div`
display: flex;
width: 70%;

align-items: center;
margin : 1px
@media ${(props)=> props.theme.mobile}{
    width: 0px;
    height: 0px;

}
`;

const RightSection = styled.div`
display: flex;
width: 20%;
align-items: center;
justify-content: right;
margin : 10px
@media ${(props)=> props.theme.mobile}{
    display: hidden;

}
`;



const LogoWrap = styled.div`
margin: 10px;
width: 130px;
height: 70px;`

const LeftBtnWrap = styled.div`
margin: 10px;
font-size: 100%;
@media ${(props)=> props.theme.mobile}{
    width: 0px;
    heigth: 0px;
    font-size: 0;

}`
const RightBtnWrap = styled.div`
margin: 5px;
font-size: 100%;
`

interface Iprops {
    modalhandler: any;

}



function Nav (props:Iprops):JSX.Element  {
    console.log(props.modalhandler)
    
    return (
        <Navi>
            <NavWrap>
                <MenubarBtn onClick = {props.modalhandler}><AiOutlineMenu size = "30px" color = "grey" /></MenubarBtn>
                <LogoWrap><Link to = '/'><img src= "images/menubarlogo.png" width = "120px"></img></Link></LogoWrap>
            <LeftSection>
                
                <LeftBtnWrap><Link to ='/mainboard' className= 'btn'>Community</Link></LeftBtnWrap>
                <LeftBtnWrap><Link to ='/roadmap' className= 'btn'>RoadMap</Link></LeftBtnWrap>
                
            </LeftSection>
            
                {isLogin ? 
                <RightSection>
                    <RightBtnWrap>Logout</RightBtnWrap>
                    <RightBtnWrap>Mypage</RightBtnWrap>
                </RightSection> : 

                <RightSection>
                    <RightBtnWrap>Login</RightBtnWrap>
                    <RightBtnWrap>Join</RightBtnWrap>
                </RightSection>}
                
            
        
            </NavWrap>
        
            
        </Navi>
        
        
        
        
        
    )
}

export default Nav;
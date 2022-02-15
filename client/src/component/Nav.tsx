import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';

let isLogin = false //나중에 props나 redux등으로 받을것 

const Navi = styled.header`
    
    width: 100%;
    height: 70px;
    background: #F3F3F3;

    @media ${(props)=> props.theme.mobile}{
        width: 100%;
        
    }
    
    
    
`

const MenubarBtn = styled.div`
margin: 10px ;
width: 40px;
height: 70px;

`
const NavWrap = styled.div`
display: flex;
background: white
align-items: center;
justify-content: center;

margin: 2px ;`


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





function Nav ():JSX.Element  {
    
    return (
        <Navi>
            <NavWrap>
                <MenubarBtn><img src = "images/hamburgermenubar.png" width = "50px" ></img></MenubarBtn>
                <LogoWrap><img src= "images/menubarlogo.png" width = "120px"></img></LogoWrap>
            <LeftSection>
                
                <LeftBtnWrap>Community</LeftBtnWrap>
                <LeftBtnWrap>RoadMap</LeftBtnWrap>
                
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
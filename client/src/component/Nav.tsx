import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import {AiOutlineMenu} from 'react-icons/ai'

// let isLogin = false//나중에 props나 redux등으로 받을것 

const Navi = styled.header`
    
    width: 100%;
    height: 70px;
    background: #F3F3F3;

    @media ${(props)=> props.theme.mobile}{
        width: 100%;
        
    }
    
    
    
`

const MenubarBtn = styled.header`
margin: 20px;
margin-top: 10px;
width: 50px;
align-items: center;


`
const NavWrap = styled.header`
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
    }
}
`


const LeftSection = styled.header`
display: flex;
width: 70%;

align-items: center;
margin : 1px;
@media ${(props)=> props.theme.mobile}{
    width: 0px;
    height: 0px;

}
`;

const RightSection = styled.header`
display: flex;
width: 20%;
align-items: center;
justify-content: right;
margin : 10px;
@media ${(props)=> props.theme.mobile}{
    display: hidden;

}
`;

const LogoWrap = styled.header`
margin: 10px;
width: 130px;
height: 70px;`

const LeftBtnWrap = styled.header`
margin: 10px;
font-size: 100%;
@media ${(props)=> props.theme.mobile}{
    width: 0px;
    heigth: 0px;
    font-size: 0;

}`
const RightBtnWrap = styled.header`
margin: 5px;
font-size: 100%;
cursor: pointer;
`

interface Iprops {
    modalhandler: any;
    modalcloser: any;
    islogin: boolean;
    logouthandler: any;

}



function Nav (props:Iprops):JSX.Element  {
    // console.log(props.modalhandler)
    
    return (
        <Navi>
            <NavWrap>
                <MenubarBtn onClick = {props.modalhandler}><AiOutlineMenu size = "30px" color = "grey" /></MenubarBtn>
                <LogoWrap onClick = {props.modalcloser}><Link to = '/'><img src= "images/menubarlogo.png" width = "120px"></img></Link></LogoWrap>
            <LeftSection onClick = {props.modalcloser}>
                
                <LeftBtnWrap><Link to ='/mainboard' className= 'btn'>Community</Link></LeftBtnWrap>
                <LeftBtnWrap><Link to ='/roadmap' className= 'btn'>RoadMap</Link></LeftBtnWrap>
                
            </LeftSection>
            
                {props.islogin ? 
                <RightSection onClick = {props.modalcloser}>
                    <RightBtnWrap onClick = {props.logouthandler}>Logout</RightBtnWrap>
                    <RightBtnWrap><Link to = '/mypage' className = 'btn'>Mypage</Link></RightBtnWrap>
                </RightSection> : 

                <RightSection onClick = {props.modalcloser}>
                    <RightBtnWrap><Link to = '/login' className = 'btn'>Login</Link></RightBtnWrap>
                    <RightBtnWrap><Link to = '/signup' className = 'btn'>Join</Link></RightBtnWrap>
                </RightSection>}
                
            
        
            </NavWrap>
        
            
        </Navi>   
        
        
        
        
    )
}

export default Nav;
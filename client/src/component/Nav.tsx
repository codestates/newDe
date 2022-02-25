import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import {AiOutlineMenu} from 'react-icons/ai'
import { RootState } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setLogin } from '../features/info';
import axios from 'axios';
import { apiURL } from '../url';

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
}`

const LeftSection = styled.header`
display: flex;
width: 70%;

align-items: center;
margin : 1px;
@media ${(props)=> props.theme.mobile}{
    width: 100%;
    height: 100%;

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
    logouthandler: any;

}



function Nav (props:Iprops):JSX.Element  {
    // console.log(props.modalhandler)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLogin = useAppSelector((state: RootState) => state.info.login)
    // let isLogin = props.islogin

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    };

    const handleLogout = () => {
        axios
         .get(`${apiURL}/user/logout`,config)
         .then((res) => {
             dispatch(setLogin(false))
             navigate('/')
         })
    }

    return (
        <Navi>
            <NavWrap>
                <MenubarBtn onClick = {props.modalhandler}><AiOutlineMenu size = "30px" color = "grey" /></MenubarBtn>
                <LogoWrap onClick = {props.modalcloser}><Link to = '/'><img src= "images/menubarlogo.png" width = "120px"></img></Link></LogoWrap>
            <LeftSection onClick = {props.modalcloser}>
                
                <LeftBtnWrap><Link to ='/mainboard' className= 'btn'>Community</Link></LeftBtnWrap>
                <LeftBtnWrap><Link to ='/roadmap' className= 'btn'>RoadMap</Link></LeftBtnWrap>
                
            </LeftSection>
            
                {isLogin ? 
                <RightSection onClick = {props.modalcloser}>
                    <RightBtnWrap onClick = {handleLogout}>Logout</RightBtnWrap>
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
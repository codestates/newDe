import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import {AiOutlineMenu} from 'react-icons/ai'
import { RootState } from '../store'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setLogin, setOauth, setAdmin, setNickname } from '../features/info';
import axios from 'axios';
import { apiURL } from '../url';
import { setOriginalNode } from 'typescript';
import { useMatch } from 'react-router';

// let isLogin = false//나중에 props나 redux등으로 받을것 

const Navi = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 80px;
  top: 0;
  z-index: 1;
  background-color: white;
  font-size: 15px;
  @media ${(props)=> props.theme.mobile}{
    width: 100%;
}
`
const Logo = styled.img`
  margin-left: 30px;
  margin-right: 30px;
  width: 70px;
  height: 40px;
  @media ${(props)=> props.theme.mobile}{
    width: 80%;
    margin-left: 10px;
}
`

const Col = styled.div`
  display: flex;
  align-items: center;
  .btn {
      margin-left: 15px;
      &:hover {
        cursor: pointer;
        color: gray
  }
  }
`

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  transition: whitesmoke 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 21px;
  &:hover {
    cursor: pointer;
    color: gray
  }
  @media ${(props)=> props.theme.mobile}{
    font-size: 18px;
}
`;

const Circle = styled.span`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;



function Nav ():JSX.Element  {
    const homeMatch = useMatch("mainboard")
    const testMatch = useMatch("test")
    const mypageMatch = useMatch("mypage")

    
    // console.log(props.modalhandler)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLogin = useAppSelector((state: RootState) => state.info.login)
    const isAdmin = useAppSelector((state: RootState) => state.info.admin)
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
             navigate('/')     
             dispatch(setLogin(false))
             dispatch(setOauth(false))  
             dispatch(setAdmin(false))
             dispatch(setNickname(''))
         }).catch(err=>{
             console.log(err)
         })
    }

    return (
        <Navi>
            <Col>
                {/* <AiOutlineMenu onClick = {props.modalhandler} className='btn' size={24} /> */}
                <Link to = "/"><Logo src= "images/name.png"></Logo></Link>
                <Items>
                    <Item><Link to = "/mainboard">Community {homeMatch && <Circle /> }</Link></Item>
                    <Item><Link to = "/test">Test {testMatch && <Circle />}</Link></Item>
                </Items>
            </Col>
            {isLogin 
            ? isAdmin 
            ?
            <Col>
                <Item><Link to ='/admin'>admin</Link></Item>
                <Item><Link to = "/mypage">Mypage {mypageMatch && <Circle />}</Link></Item>
                <Item onClick = {handleLogout}>Logout</Item>
            </Col> 
            :
            <Col>
                <Item><Link to = "/mypage">Mypage {mypageMatch && <Circle />}</Link></Item>
                <Item onClick = {handleLogout}>Logout</Item>
            </Col>
            :
            <Col>
                <Item><Link to = "/login">Login</Link></Item>
                <Item><Link to = "/signup">Join</Link></Item>
            </Col>
            }
        </Navi>
    )
}

export default Nav;
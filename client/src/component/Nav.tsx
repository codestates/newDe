import styled from 'styled-components';
<<<<<<< HEAD
import { BiMenuAltRight } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useState } from 'react';

function Nav(): JSX.Element {
    const [visible, setVisible] = useState(false)


    const NavWrap = styled.nav`
    width: 100%;
    color:white;
    font-size:2rem;
    height: 7%;
    background: #333333;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
    min-height: 7%;


        .icon {
            font-size: 35px;
            cursor: pointer; 
            display: block;
            transition: 0.5s;

            :hover{
                transform:scale(1.5);
            }
        }

        @media ${props => props.theme.tablet}{

        }
    `

    const SideNav = styled.div`
        background-color: #F1F2ED;
        position:absolute;
        height: 100%;
        right: 0%;
        visibility:${visible ? 'visible' : 'hidden'};
        transition-property: width;
        transition-duration: 2s;
        font-size:3rem;
        flex-direction: column;
        display:inline-block;
        z-index: 15;


            .sideNav {
                background-color: red;
                
            }

    `
   
    const Logo = styled.img`
        position:relative;
        filter:invert();
        display: block;
        width: auto;
        height: 40px;
        transition: 0.5s;

            :hover{
                transform:rotate(20deg);
            }
        `

    const BackGround = styled.div`
        ${visible?`position: fixed;
        display: grid;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        background: rgba(255, 0, 0);`:``}
    `
    const clickHandler = (e: any) => {
        setVisible(true)
    }
    const closeHandler = (e: any) => {
        setVisible(false)
    }
    return (
        <BackGround>

                <NavWrap>
                    <Link to='/'><Logo src='images/logo.png' alt='logo' /></Link>
                    newde
                    <a onClick={clickHandler}><BiMenuAltRight className='icon' /></a>
                </NavWrap>


                <SideNav>
                    <div className='sideNav'>ddd</div>
                        <Link to='/login' onClick={closeHandler}>Login</Link>
                        <Link to='/mypage' onClick={closeHandler}>MyPage</Link>
                        <Link to='/board' onClick={closeHandler}>Board</Link>
                        <Link to='/signup' onClick={closeHandler}>SignUp</Link>
                    <div onClick={closeHandler}>X</div>
                </SideNav>

        </BackGround>
=======
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import {AiOutlineMenu} from 'react-icons/ai'


let isLogin = false//나중에 props나 redux등으로 받을것 


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
    }`


const LeftSection = styled.header`
display: flex;
width: 70%;

align-items: center;
margin : 1px
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
margin : 10px
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
`

interface Iprops {
    modalhandler: any;
    modalcloser: any;

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
            
                {isLogin ? 
                <RightSection onClick = {props.modalcloser}>
                    <RightBtnWrap>Logout</RightBtnWrap>
                    <RightBtnWrap><Link to = '/mypage' className = 'btn'>Mypage</Link></RightBtnWrap>
                </RightSection> : 

                <RightSection onClick = {props.modalcloser}>
                    <RightBtnWrap><Link to = '/login' className = 'btn'>Login</Link></RightBtnWrap>
                    <RightBtnWrap><Link to = '/signup' className = 'btn'>Join</Link></RightBtnWrap>
                </RightSection>}
                
            
        
            </NavWrap>
        
            
        </Navi>
        
        
        
        
        
>>>>>>> 6247427a2d2ae334f4364e6b7e977f8dda4550f9
    )
}

export default Nav;
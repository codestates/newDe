import styled from 'styled-components';
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
    )
}

export default Nav;
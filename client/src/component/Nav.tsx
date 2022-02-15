import styled from 'styled-components';

const NavWrap = styled.div`
    background: blue;
    display: flex;
    
    
`
const LogoWrap = styled.div`
    background: red;
    
`

function Nav ():JSX.Element  {
    return (
        <NavWrap>
            <LogoWrap>
                
                여기는 로고 영역입니다. 
                
            </LogoWrap>
            <div>
                
            여기는 네비게이션바입니다. 
            </div>
        </NavWrap>
        
    )
}

export default Nav;
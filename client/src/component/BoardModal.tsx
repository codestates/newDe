import styled from 'styled-components';

const MenuWrap = styled.div`
position: absolute;
width: 30%;
height: 90%;
background: pink;
@media ${(props)=> props.theme.mobile}{
    width: 100%;
    
}`

function BoardModal ():JSX.Element  {
    return (
        <MenuWrap>
            여기는 게시판 목록 모달이다. 모바일 화면에서 클릭시 width = 100 % 
        </MenuWrap>
    )
}

export default BoardModal;
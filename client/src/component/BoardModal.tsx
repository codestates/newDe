import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom'

const ContainerWrap = styled.div`
position: absolute;
width: 30%;
background: lightgrey;

@media ${(props)=> props.theme.mobile}{
    width: 100%;
    
}
.btn {
    text-decoration-line: none;
    color: #34495E;
    &:hover {
      cursor: pointer;
      outline: none;
      color: black;
    }`
const ParentMenuWrap = styled.div`

text-align: center;
`
const ChileMenuWrap = styled.div`
text-align: right;
padding-right: 20%

`



function BoardModal ():JSX.Element  {
    return (
        <ContainerWrap>
            <ParentMenuWrap><Link to = '/Board' className = 'btn'>Front</Link></ParentMenuWrap>
            <ChileMenuWrap><Link to = '/Board' className = 'btn'>CSS</Link></ChileMenuWrap>
            <ChileMenuWrap><Link to = '/Board' className = 'btn'>React</Link></ChileMenuWrap>
            <ParentMenuWrap><Link to = '/Board' className = 'btn'>Back</Link></ParentMenuWrap>
        </ContainerWrap>
    )
}

export default BoardModal;
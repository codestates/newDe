import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom'

const Background = styled.div`
position: absolute;
width: 100%;
height: 90%;
background: ghost;

`
const ContainerWrap = styled.div`
border: 1px solid black;
position: absolute;
width: 30%;
background: Whitesmoke;
opacity: 90%;
padding: 10px;


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
padding-bottom: 3px;
border-bottom: 2px solid black;
text-align: center;
`
const ChildMenuWrap = styled.div`
margin: 4%;
padding-bottom: 4%;
text-align: center;

border-bottom: 1px solid gray;
padding-right: 30%
border : 1px 



    



`



function BoardModal (props:any):JSX.Element  {
    return (
        <Background onClick = {props.modalHandler}>
            <ContainerWrap>
            <ParentMenuWrap><Link to = '/board?parentcategory=front' className = 'btn'>Front</Link></ParentMenuWrap>
            <ChildMenuWrap><Link to = '/board?parentcategory=front&childcategory=html' className = 'btn'>HTML</Link></ChildMenuWrap>
            <ChildMenuWrap><Link to = '/board?parentcategory=front&childcategory=css' className = 'btn'>CSS</Link></ChildMenuWrap>
            <ChildMenuWrap><Link to = '/board?parentcategory=front&childcategory=javascript' className = 'btn'>JavaScript</Link></ChildMenuWrap>
            <ChildMenuWrap><Link to = '/board?parentcategory=front&childcategory=react' className = 'btn'>React</Link></ChildMenuWrap>
            <ChildMenuWrap><Link to = '/board?parentcategory=front&childcategory=프론트 기타' className = 'btn'>기타</Link></ChildMenuWrap>
            
            <ParentMenuWrap><Link to = '/board?parentcategory=back' className = 'btn'>Back</Link></ParentMenuWrap>
            <ChildMenuWrap><Link to = '/board?parentcategory=back&childcategory=php' className = 'btn'>PHP</Link></ChildMenuWrap>
            <ChildMenuWrap><Link to = '/board?parentcategory=back&childcategory=node.js' className = 'btn'>Node.js</Link></ChildMenuWrap>
            <ChildMenuWrap><Link to = '/board?parentcategory=back&childcategory=javascript' className = 'btn'>JavaScript</Link></ChildMenuWrap>
            <ChildMenuWrap><Link to = '/board?parentcategory=back&childcategory=java' className = 'btn'>Java</Link></ChildMenuWrap>
            <ChildMenuWrap><Link to = '/board?parentcategory=back&childcategory=python' className = 'btn'>Python</Link></ChildMenuWrap>
            <ChildMenuWrap><Link to = '/board?parentcategory=back&childcategory=server' className = 'btn'>서버</Link></ChildMenuWrap>
            <ChildMenuWrap><Link to = '/board?parentcategory=back&childcategory=백엔드 기타' className = 'btn'>기타</Link></ChildMenuWrap>
        
        
        </ContainerWrap>
        </Background>
        
    )
}

export default BoardModal;
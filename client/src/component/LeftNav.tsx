import styled from 'styled-components';
import { Link } from 'react-router-dom'

const ContainerWrap = styled.div`
  position: fixed;
  height: 100%;
  width: 5%;
  margin-left: 5px;
  background-color: white;
.btn {
    text-decoration-line: none;
    color: #34495E;
    &:hover {
      cursor: pointer;
      outline: none;
      color: black;
    }
}`

const BackCategory = styled.li`
 margin-top:20px;
 font-size: 25px;
`

const FrontCategory = styled.li`
 font-size: 25px;
`

const ParentMenuWrap = styled.ul`

`
const ChildMenuWrap = styled.li`
 margin-top:10px;
`



function leftnav (props:any):JSX.Element  {
    return (
        <ContainerWrap>
            <ParentMenuWrap>
                <FrontCategory><Link to = '/board?parentcategory=front' className = 'btn'>Front</Link></FrontCategory>
                <ChildMenuWrap><Link to = '/board?parentcategory=front&childcategory=html' className = 'btn'>HTML</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=front&childcategory=css' className = 'btn'>CSS</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=front&childcategory=javascript' className = 'btn'>JavaScript</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=front&childcategory=react' className = 'btn'>React</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=front&childcategory=프론트 기타' className = 'btn'>기타</Link></ChildMenuWrap>
            </ParentMenuWrap>
            <ParentMenuWrap>
                <BackCategory><Link to = '/board?parentcategory=back' className = 'btn'>Back</Link></BackCategory>
                <ChildMenuWrap><Link to = '/board?parentcategory=back&childcategory=php' className = 'btn'>PHP</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=back&childcategory=node.js' className = 'btn'>Node.js</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=back&childcategory=javascript' className = 'btn'>JavaScript</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=back&childcategory=java' className = 'btn'>Java</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=back&childcategory=python' className = 'btn'>Python</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=back&childcategory=server' className = 'btn'>서버</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=back&childcategory=백엔드 기타' className = 'btn'>기타</Link></ChildMenuWrap>
            </ParentMenuWrap>
        </ContainerWrap>       
    )
}

export default leftnav;
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const ContainerWrap = styled.div`
  position: fixed;
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
 font-size: 30px;
`

const FrontCategory = styled.li`
 font-size: 30px;
`

const ParentMenuWrap = styled.ul`

`
const ChildMenuWrap = styled.li`
 margin-top:10px;
 font-size: 20px;
`



function Leftnav (props:any):JSX.Element  {

    return (
        <ContainerWrap onClick={()=>props.setPageChanged(true)}>
            <ParentMenuWrap>
                <FrontCategory><Link to = '/board?parentcategory=Front' className = 'btn'>Front</Link></FrontCategory>
                <ChildMenuWrap><Link to = '/board?parentcategory=Front&childcategory=HTML' className = 'btn'>HTML</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=Front&childcategory=CSS' className = 'btn'>CSS</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=Front&childcategory=JavaScript' className = 'btn'>JavaScript</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=Front&childcategory=React' className = 'btn'>React</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=Front&childcategory=프론트기타' className = 'btn'>기타</Link></ChildMenuWrap>
            </ParentMenuWrap>
            <ParentMenuWrap>
                <BackCategory><Link to = '/board?parentcategory=Back' className = 'btn'>Back</Link></BackCategory>
                <ChildMenuWrap><Link to = '/board?parentcategory=Back&childcategory=php' className = 'btn'>php</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=Back&childcategory=Node' className = 'btn'>Node.js</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=Back&childcategory=Java' className = 'btn'>Java</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=Back&childcategory=Python' className = 'btn'>Python</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=Back&childcategory=서버' className = 'btn'>서버</Link></ChildMenuWrap>
                <ChildMenuWrap><Link to = '/board?parentcategory=Back&childcategory=백엔드기타' className = 'btn'>기타</Link></ChildMenuWrap>
            </ParentMenuWrap>
        </ContainerWrap>       
    )
}

export default Leftnav;
import styled from 'styled-components';



const MainContainer = styled.div`
margin-top: 7%;
display: flex;
text-align: center;
flex-direction: column;
background : white;
width: 100%;
.btn {
    text-decoration-line: none;
    color: #34495E;
    &:hover {
      cursor: pointer;
      outline: none;
      color: black;
    }
}`


function Test(): JSX.Element {
    return (
    
    <MainContainer>
        테스트페이지임 

    </MainContainer>
    )
}
export default Test

//랜딩페이지 

import styled from 'styled-components';

const MainDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: #F3F3F3;
    
`
function Landing (props:any):JSX.Element {
    console.log(props)

    return (
        <MainDiv onClick = {props.closemodal} >

        
            랜딩페이지입니다. 
        
        </MainDiv>
        



    )
}
        

export default Landing 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

const MainBoard = styled.div`
flex-direction: column;
width: 1000px;
height: 500px;
display: flex;
justify-content: center;

`
const BulbBox = styled.div`

`
const WordBox = styled.div`
margin: 5%;
font-size: 150%;
`

function NoContentPage () {
    return <MainBoard>
        <BulbBox><FontAwesomeIcon className = 'icon' icon={faCircleQuestion} size= '3x' /></BulbBox>
        
        <WordBox>찾으시는 글이 없습니다.</WordBox>

        
        
    </MainBoard>
        


    
}

export default NoContentPage
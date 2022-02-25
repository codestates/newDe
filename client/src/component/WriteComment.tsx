import styled from 'styled-components';

const FormBox = styled.form`
display: flex;

margin: 0;
width: 100%;
height: 100%;
background-color: seashell;


`
const TextArea = styled.textarea`
margin: 2%;
width: 85%;
`
const SubmitBtn = styled.button`
margin-top: 3%;

height: 50%;
`
function WriteComment():JSX.Element {

    return (
        <FormBox>
            <TextArea />
            <SubmitBtn>댓글 쓰기</SubmitBtn>
        </FormBox>
    )
    
}

export default WriteComment;
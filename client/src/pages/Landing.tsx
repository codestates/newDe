import styled from 'styled-components';
import { Landing1 } from '../component/Landing/Landing1/LandingOne';
import { Landing2 } from '../component/Landing/Landing2/LandingTwo';
import { Landing3 } from '../component/Landing/Landing3/LandingThree';

const LandingWholeContainer = styled.div`
  /* border: 10px solid black; */
  overflow: hidden;
  position: relative;
  height: 2900px;
  width: 100vw;
`

const LandingWrapperOne = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  height: 1000px;
`;

const LandingWrapperTwo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  height: 950px;
`;

const LandingWrapperThree = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  height: 950px;
`;

function Landing ():JSX.Element {
    return (
        <>
        <LandingWholeContainer>

          <LandingWrapperOne>
              <Landing1 />
          </LandingWrapperOne>

          <LandingWrapperTwo>
              <Landing2 />
          </LandingWrapperTwo>

          <LandingWrapperThree>
              <Landing3 />
          </LandingWrapperThree>

        </LandingWholeContainer>
        </>
    )
}
        

export default Landing 
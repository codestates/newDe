import {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Board, ContentView, Landing, Login, MainBoard, MyPage, MyPageEdit, RoadMap, SignUp, Writing } from './pages'
import {Nav, BoardModal} from './component';
import {ThemeProvider} from 'styled-components'
import styled from 'styled-components';
import theme from './style/theme';


// let isModalOpened = true


const ContentWrap = styled.div`

display: flex;`
function App() {
  type funcProps = {
    modalHandler(): void 

    

     // 파라미터와 함수의 return이 없을 경우
 
  }
  

  const [isModalOpened, setModal] = useState(false)
  function modalHandler () {
    setModal(!isModalOpened)
  }
  return (
    <div className="App">
      <ThemeProvider theme = {theme}>
        <BrowserRouter>
          <Nav modal = {modalHandler}/>
          <ContentWrap>
            
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/board' element={<Board />} />
            <Route path='/contentview' element={<ContentView />} />
            <Route path='/login' element={<Login />} />
            <Route path='/mainboard' element={<MainBoard />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/mypageedit' element={<MyPageEdit />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/writing' element={<Writing />} />
            <Route path='/roadmap' element={<RoadMap />} />



          </Routes>
      
          
          
          {isModalOpened ? <BoardModal /> : null}
          </ContentWrap>
          
          
        </BrowserRouter>
      </ThemeProvider>
      
    </div>
  );
}

export default App;

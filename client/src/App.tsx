import {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Board, ContentView, Landing, Login, MainBoard, MyPage, MyPageEdit, RoadMap, SignUp, Writing, Callback } from './pages'
import {Nav, BoardModal} from './component';
import {ThemeProvider} from 'styled-components'
import styled from 'styled-components';
import theme from './style/theme';


// let isModalOpened = true


const ContentWrap = styled.div`

display: flex;`
function App() {
  
  const [isLogin, setlogin] = useState(false)

  const [isModalOpened, setModal] = useState(false)
  function modalHandler () {
    setModal(!isModalOpened)
  }

  function modalCloser(){
    setModal(false)
  }

  function loginHandler(){
    setlogin(true)
  }

  function logoutHandler(){
    setlogin(false)
  }
  

  return (
    <div className="App">
      <ThemeProvider theme = {theme}>
        <BrowserRouter>
          <Nav modalhandler = {modalHandler} modalcloser = {modalCloser} islogin={isLogin} logouthandler = {logoutHandler}/>
          <ContentWrap>
            
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/board' element={<Board />} />
            <Route path='/:id' element={<ContentView />} />
            <Route path='/login' element={<Login loginhandler = {loginHandler} />} />
            <Route path='/mainboard' element={<MainBoard />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/mypageedit' element={<MyPageEdit />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/writing' element={<Writing />} />
            <Route path='/roadmap' element={<RoadMap />} />
            <Route path='/callback' element={<Callback loginhandler = {loginHandler} />} />
          </Routes>
          {isModalOpened ? <BoardModal modalHandler = {modalHandler} /> : null} 
          {/* 가장 위에 렌더링 되어야므로 마지막에 렌더링  */}
          </ContentWrap>
        </BrowserRouter>
      </ThemeProvider>
      
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Board, ContentView, Landing, Login, MainBoard, MyPage, MyPageEdit, SignUp, Writing } from './pages'
import Nav from './component/Nav';
import {ThemeProvider} from 'styled-components'
import theme from './style/theme';



function App() {
  return (
    <div className="App">
      <ThemeProvider theme = {theme}>
        <BrowserRouter>
          <Nav />
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



          </Routes>
      
        </BrowserRouter>
      </ThemeProvider>
      
    </div>
  );
}

export default App;

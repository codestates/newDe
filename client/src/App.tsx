import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Board, ContentView, Landing, Login, MainBoard, MyPage, MyPageEdit, SignUp, Writing } from './pages'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/board' element={<Board />} />
        <Route path='/contentView' element={<ContentView />} />
        <Route path='/login ' element={<Login />} />
        <Route path='/mainboard' element={<MainBoard />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/mypageedit' element={<MyPageEdit />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/writing' element={<Writing />} />



      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;

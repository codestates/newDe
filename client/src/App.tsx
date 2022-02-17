import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Board, ContentView, Landing, Login, MainBoard, MyPage, MyPageEdit, SignUp, Writing } from './pages'
import Nav from './component/Nav';


function App() {


  
  return (
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
  );
}

export default App;
